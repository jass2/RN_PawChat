import React, { useEffect, useState } from 'react';
import { Box, HStack, Text, VStack } from "native-base";
import { StyleSheet } from 'react-native';

const InfoCard = ({ navigation, profile, onClickActions, canEdit }) => {
  const [viewingUserRole, setViewingUserRole] = useState();

  useEffect(() => {
    if (!viewingUserRole) {
      getRoleName(profile.role).then(r => {
        setViewingUserRole(r);
      });
    }
  }, [viewingUserRole, profile]);

  return (
    <Box
      my="2"
      mx="2"
      space={2}
      rounded="lg"
      borderColor="coolGray.200"
      borderWidth="1">
      <VStack rounded="md" mx="4">
        <HStack>
          <Text>Name</Text>
          <Text>{profile.first}</Text>
        </HStack>
        <HStack>
          <Text>Major</Text>
          <Text>{profile.major}</Text>
        </HStack>
        <HStack>
          <Text>Year</Text>
          <Text>{profile.graduating}</Text>
        </HStack>
        <HStack>
          <Text>Bio</Text>
          <Text>{profile.bio}</Text>
        </HStack>
        <HStack>
          <Text>Roles</Text>
          <Text>{viewingUserRole}</Text>
        </HStack>
      </VStack>
    </Box>
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
