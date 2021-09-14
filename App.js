import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { errorCodes } from './util/errorCodes';
import ErrorDialog from './components/errorDialog';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from './util/keys';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import Login from './components/authLogin/login';
import Home from './components/home/home';

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

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  });

  if (!user) {
    return <Login login={onGoogleButtonPress} />;
  }

  return <Home user={user} signOut={signOut} />;

  // Handle user state changes
  async function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
}

async function onGoogleButtonPress() {
  // Get the users ID token
  try {
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    return ErrorDialog(
      errorCodes[error.code].title,
      errorCodes[error.code].string
    );
  }
}

async function signOut() {
  try {
    await GoogleSignin.signOut();
    return auth().signOut();
  } catch (error) {
    console.error(error);
  }
}
