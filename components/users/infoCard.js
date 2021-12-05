import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useStateValue } from '../../store/store';

const InfoCard = ({ navigation, profile, onClickActions, canEdit }) => {
  const [viewingUserRole, setViewingUserRole] = useState();
  const [{ user, isAdmin }] = useStateValue();

  useEffect(() => {
    if (!viewingUserRole) {
      getRoleName(profile.role).then(r => {
        setViewingUserRole(r);
      });
    }
  }, [viewingUserRole, profile]);

  return (
    <VStack>
      <HStack>
        <VStack w="25%">
          <Image
            size="xl"
            resizeMode={'contain'}
            borderRadius={100}
            source={{
              uri: profile.photoURL,
            }}
            alt="Alternate Text"
          />
        </VStack>
        <VStack w="75%">
          <Text fontSize="2xl">{profile.email.split('@')[0]} </Text>
          <Box
            space={2}
            rounded="lg"
            borderColor="coolGray.200"
            borderWidth="1">
            <VStack w="70%" rounded="md" mx="4">
              <HStack>
                <Text>{profile.first ? profile.first : 'No Name Set'}</Text>
              </HStack>
              <HStack>
                <Text>{profile.major && profile.major}</Text>
              </HStack>
              <HStack>
                <Text>{profile.graduating && profile.graduating}</Text>
              </HStack>
            </VStack>
            <VStack w="10%">
              {isAdmin ||
                (user.email === profile.email && (
                  <IconButton
                    icon={
                      <Icon as={Ionicons} name="md-pencil-outline" size="md" />
                    }
                    onPress={() => {
                      console.log('edit');
                    }}
                  />
                ))}
            </VStack>
          </Box>
        </VStack>
      </HStack>
      <HStack>
        <Text>{profile.bio && profile.bio}</Text>
      </HStack>
    </VStack>
  );
};

function getRoleName(role) {
  return role.get().then(r => {
    return r.data().name;
  });
}

const styles = StyleSheet.create({
  alignTextEnd: {
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  commentCard: {
    borderColor: '#000000',
    borderWidth: 1,
    paddingBottom: 5,
  },
});

export default InfoCard;
