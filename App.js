import React, { useEffect, useState } from 'react';
import { errorCodes } from './util/errorCodes';
import ErrorDialog from './components/errorDialog';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Login from './components/authLogin/login';
import Home from './components/home/home';
import firestore from '@react-native-firebase/firestore';

firestore().settings({
  persistence: false, // disable offline persistence
});

export default () => {
  // Set an initializing state whilst Firebase connects

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '926402690323-k0elc3uo8h97vkbtmmsnqe6942k56j8n.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });

    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
  });

  async function signOut() {
    try {
      await GoogleSignin.revokeAccess();
      auth()
        .signOut()
        .then(() => alert('Your are signed out!'));
      setUser();
    } catch (error) {
      console.error(error);
    }
  }

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
};

async function onGoogleButtonPress() {
  // Get the users ID token
  try {
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    return ErrorDialog(
      errorCodes[error.code].title,
      errorCodes[error.code].string
    );
  }
}
