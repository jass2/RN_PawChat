import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { timeSince } from '../../util/date';

const Comment = ({ navigation, comment, onClickActions }) => {
  return (
    <Box my="2" mx="2" rounded="lg" borderColor="coolGray.200" borderWidth="1">
      <HStack rounded="md">
        <HStack w="75%">
          <Pressable
            my="2"
            mx="2"
            onPress={() => {
              navigation.navigate('View User Profile', comment.poster);
            }}>
            <HStack my="2" mx="2">
              <Image
                size="xs"
                resizeMode={'contain'}
                borderRadius={25}
                source={{
                  uri: comment.posterImg,
                }}
                alt="Alternate Text"
              />
              <VStack>
                <Text mx="2" fontSize="sm">
                  {comment.poster}
                </Text>
                <Text mx="2" fontSize="xs">
                  {comment.timestamp && timeSince(comment.timestamp.toDate())}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        </HStack>
        <VStack w="25%">
          <IconButton
            style={styles.alignTextEnd}
            icon={
              <Icon as={Ionicons} name="ellipsis-horizontal-sharp" size="md" />
            }
            onPress={onClickActions}
          />
        </VStack>
      </HStack>
      <HStack mx="4">
        <Divider color="black" w="100%" inset={true} insetType="middle" />
      </HStack>
      <HStack>
        <Text fontSize="sm" mx="2" my="2">
          {comment.text}
        </Text>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  alignTextEnd: {
    justifyContent: 'flex-end',
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
