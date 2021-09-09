import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from './util/keys';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
  apiKey: 'AIzaSyBRECcflbzGvEILeINjZoM7JD5R4wX1S04',
  authDomain: 'semesterproj-36773.firebaseapp.com',
  databaseURL: 'https://semesterproj-36773.firebaseio.com',
  projectId: 'semesterproj-36773',
  storageBucket: 'semesterproj-36773.appspot.com',
  messagingSenderId: '926402690323',
  appId: '1:926402690323:web:bb346f3baeff8c32322ee6',
  measurementId: 'G-L83WWZY0JG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

GoogleSignin.configure({
  webClientId:
    '926402690323-j9nq54fj6252e0jjshd64p9sv841hl8j.apps.googleusercontent.com',
  offlineAccess: true,
});

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  if (!user) {
    return (
      <View>
        <GoogleSigninButton
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!')
            )
          }
        />
        <Text>{WEB_CLIENT_ID}</Text>
        <Text>EEEEEE</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );

  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
}
