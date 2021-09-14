import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import React from 'react';
import { View } from 'react-native';

const Login = ({ login }) => {
  return (
    <View>
      <GoogleSigninButton onPress={login} />
    </View>
  );
};

export default Login;
