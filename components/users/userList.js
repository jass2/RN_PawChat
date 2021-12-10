import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
  Box,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  useDisclose,
  View,
  VStack,
} from 'native-base';
import { useStateValue } from '../../store/store';
import { getUserFromLogin, getUsers } from '../../api/user';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { timeSince } from '../../util/date';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserList = ({ navigation, route }) => {
  const [{ viewingUser }, dispatch] = useStateValue();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(u => {
      setUsers(u.docs);
    });
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
              let u = item.item.data();
              dispatch({
                type: 'viewUser',
                viewingUser: u,
              });
              navigation.push('View User Profile');
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
