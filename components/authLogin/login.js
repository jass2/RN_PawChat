import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import ErrorDialog from '../errorDialog';
import { errorCodes } from '../../util/errorCodes';
import firestore from '@react-native-firebase/firestore';
import { WEB_CLIENT_ID } from '../../util/keys';
import { Text } from 'native-base';

const Login = () => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const firestore_ref = firestore().collection('users');

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  async function signIn() {
    // Get the users ID token
    console.log('hit');
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setLoggedIn(true);
      // Create a Google credential with the token
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );

      // Sign-in the user with the credential
      const sub = firebase.auth().signInWithCredential(credential);
      setUser(sub);
      firebase.firestore.setLogLevel('debug');
      const ref = firestore().collection('posts');
      let p = await ref
        .get({
          source: 'server',
        })
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.id, ' => ', doc.data());
          });
        })
        .catch(error => {
          console.log('Error getting documents: ', error);
        });
      console.log(p);

      return user;
    } catch (error) {
      console.log(error);
      // return ErrorDialog(
      //   errorCodes[error.code].title,
      //   errorCodes[error.code].string
      // );
    }
  }

  return (
    <View style={styles.container}>
      <GoogleSigninButton onPress={signIn} />
      <Text>Authed: {loggedIn.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    padding: 20,
    flex: 1,
    marginVertical: 110,
  },
});

export default Login;
