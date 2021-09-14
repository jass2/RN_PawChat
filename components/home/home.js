import React from 'react';
import { Text, View, Button } from 'react-native';

const Home = ({ user, signOut }) => {
  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button onPress={signOut} title="Sign Out" />
    </View>
  );
};

export default Home;
