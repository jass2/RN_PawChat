import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useStateValue } from '../../store/store';

const InfoCard = ({ navigation, profile }) => {
  const [viewingUserRole, setViewingUserRole] = useState();
  useEffect(() => {
    profile.role.onSnapshot(r => {
      if (r.data()) {
        setViewingUserRole(r.data().name);
      }
    });
  });

  const [{ user, isAdmin }] = useStateValue();
  return (
    <VStack>
      <Box space={2} rounded="lg" borderColor="coolGray.200" borderWidth="1">
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
            <HStack>
              <Text fontSize="2xl">{profile.email.split('@')[0]} </Text>
              {isAdmin ||
                (user.email === profile.email && (
                  <IconButton
                    icon={
                      <Icon as={Ionicons} name="md-pencil-outline" size="md" />
                    }
                    onPress={() => {
                      navigation.push('Edit Profile', {
                        name: profile.first,
                        bio: profile.bio,
                        major: profile.major,
                        blocked: profile.blocked,
                        graduating: profile.graduating,
                        username: profile.username,
                      });
                    }}
                  />
                ))}
            </HStack>
            <HStack>
              <Divider color="black" w="100%" inset={true} insetType="middle" />
            </HStack>
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
              <HStack>
                <Text>{viewingUserRole}</Text>
              </HStack>
            </VStack>
            <VStack w="10%" />
          </VStack>
        </HStack>
        <HStack>
          <Text my="2" mx="2">
            {profile.bio && profile.bio}
          </Text>
        </HStack>
      </Box>
    </VStack>
  );
};

export default InfoCard;
