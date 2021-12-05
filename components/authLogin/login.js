import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import ErrorDialog from '../errorDialog';
import { errorCodes } from '../../util/errorCodes';
import { WEB_CLIENT_ID } from '../../util/keys';
import { Text } from 'native-base';
import { useStateValue } from '../../store/store';
import { getUserProfile, isAdmin } from "../../api/user";

const Login = ({ navigation }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, [loggedIn]);

  async function signIn() {
    // Get the users ID token
    try {
      await GoogleSignin.hasPlayServices();
      const { accessToken, idToken } = await GoogleSignin.signIn();
      setLoggedIn(true);
      // Create a Google credential with the token
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );
      const sub = await firebase.auth().signInWithCredential(credential);
      dispatch({
        type: 'changeUser',
        user: sub.user,
      });
      let viewingUser = await getUserProfile(sub.user);
      let admin = await isAdmin(viewingUser);
      viewingUser = viewingUser.data();
      dispatch({
        type: 'viewUser',
        viewingUser: viewingUser,
      });
      dispatch({
        type: 'changeProfile',
        loggedInProfile: viewingUser,
      });
      dispatch({
        type: 'setIsAdmin',
        isAdmin: admin,
      });
      navigation.navigate('HomeWrap');
      return sub;
    } catch (error) {
      console.log(error);
      return ErrorDialog(
        errorCodes[error.code].title,
        errorCodes[error.code].string
      );
    }
  }

  async function signOut() {
    try {
      await GoogleSignin.revokeAccess();
      auth()
        .signOut()
        .then(() => setLoggedIn(false));
    } catch (error) {
      console.error(error);
    }
  }

  function signinStatus() {
    if (loggedIn && user && user.email) {
      return (
        <View>
          <Text>Signed in as: {user.email}</Text>
          <Button onPress={signOut} title="Sign Out" />
        </View>
      );
    } else {
      return <GoogleSigninButton onPress={signIn} />;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header1}>WELCOME</Text>
      <Text style={styles.header2}>Lets Get Started</Text>
      {signinStatus()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
  },
  header1: {
    marginTop: '15%',
    fontSize: 60,
    color: 'grey',
  },
  header2: {
    position: 'relative',
    textAlign: 'center',
    fontSize: 20,
    color: 'green',
  },
});

export default Login;
