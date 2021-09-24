import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Button, Icon } from 'native-base';
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider';
import Login from './components/authLogin/login';

export default function App2() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={styles.header1}>WELCOME</Text>
        <Text style={styles.header2}>Lets Get Started</Text>

        <View style={styles.buttonPlaceholder}>
          <Login />
        </View>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 70,
    alignSelf: 'center',
    marginVertical: 150,
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
  buttonPlaceholder: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 50,
  },
  login: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  textstyle: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
});
