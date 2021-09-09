import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import { WEB_CLIENT_ID } from '../../util/keys';
import { Layout } from '@ui-kitten/components';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: false,
});

function GoogleSignIn() {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GoogleSigninButton
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!')
          )
        }
      />
    </Layout>
  );
}

import auth from '@react-native-firebase/auth';

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default GoogleSignIn;
