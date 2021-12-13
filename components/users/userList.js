import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { FlatList, HStack, Image, Text, View, VStack } from 'native-base';
import { useStateValue } from '../../store/store';
import { getUsers } from '../../api/user';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import firestore from '@react-native-firebase/firestore';

const UserList = ({ navigation, route }) => {
  const [{ viewingUser }, dispatch] = useStateValue();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const userList = getUsers().onSnapshot(u => {
      setUsers(u.docs);
    });

    return () => {
      userList();
    };
  });

  function getUserList() {
    return (
      <FlatList
        data={users}
        keyExtractor={user => user.id}
        renderItem={item => (
          <Pressable
            my="2"
            mx="2"
            onPress={() => {
              navigation.push('View User Profile', item.item.data().username);
            }}>
            <HStack my="2" mx="2">
              <Image
                size="xs"
                resizeMode={'contain'}
                borderRadius={25}
                source={{
                  uri: item.item.data().photoURL,
                }}
                alt="Alternate Text"
              />
              <VStack>
                <Text mx="2" fontSize="sm">
                  {item.item.data().username}
                </Text>
                <Text mx="2" fontSize="xs">
                  {item.item.data().major}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        )}
      />
    );
  }

  return (
    <View flex={1} height="100%">
      {getUserList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserList;
