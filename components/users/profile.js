import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Center, Text, Image } from 'native-base';
import { useStateValue } from '../../store/store';
import { getUserFromLogin } from '../../api/user';

const Profile = params => {
  const [viewingUser, setViewingUser] = useState({});
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (!viewingUser && params.username) {
      getUserFromLogin(params.username).then(snapshot => {
        console.log(snapshot);
        setViewingUser(snapshot.docs[0]);
      });
    } else if (!viewingUser) {
      getUserFromLogin(user.email.split('@')[0]).then(snapshot => {
        console.log(snapshot);
        setViewingUser(snapshot.docs[0]);
      });
    }
  }, [params.username, user.email]);

  return (
    <Center rounded="md">
      <Image
        size="xl"
        resizeMode={'contain'}
        borderRadius={100}
        source={{
          uri: 'https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg',
        }}
        alt="Alternate Text"
      />
      <Text>{viewingUser.email}</Text>
    </Center>
  );
};

const styles = StyleSheet.create({});

export default Profile;
