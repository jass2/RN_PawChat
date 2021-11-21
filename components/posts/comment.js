import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Stack,
  Text,
  VStack,
} from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Comment = ({ navigation, params, onClickActions }) => {
  return (
    <Box
      my="2"
      mx="2"
      space={2}
      key={params.id}
      rounded="lg"
      borderColor="coolGray.200"
      borderWidth="1">
      <HStack key={params.id} rounded="md" mx="4">
        <Box w="85%">
          <Text my="2" fontSize="md">
            {params.text}
          </Text>
        </Box>
        <Box w="15%" alignItems="center" justifyContent="center">
          <IconButton
            style={styles.alignTextEnd}
            icon={
              <Icon as={Ionicons} name="ellipsis-horizontal-sharp" size="xs" />
            }
            onPress={onClickActions}
          />
        </Box>
      </HStack>
      <HStack mx="4">
        <Divider color="black" w="100%" inset={true} insetType="middle" />
      </HStack>
      <HStack mx="2">
        <Box w="50%">
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Profile', params.poster);
            }}>
            <Text fontSize="sm">{params.poster}</Text>
          </TouchableWithoutFeedback>
        </Box>
        <Text w="50%" style={styles.alignTextEnd} fontSize="xs">
          {params.timestamp}
        </Text>
      </HStack>
    </Box>
  );
};

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

export default Comment;
