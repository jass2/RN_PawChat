import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Box,
  Button,
  Center,
  Divider,
  Fab,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import { serializePost } from '../../util/serialize';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Post = (navigation, params) => {
  return (
    <Stack
      class={styles.postBodyBoundaries}
      space={2}
      key={params.id}
      rounded="lg"
      borderColor="coolGray.200"
      borderWidth="1">
      <HStack space={2}>
        <Box w="90%">
          <Text fontSize="2xl">{params.title}</Text>
          {params.body && bodyText(params.body)}
        </Box>
        <Box w="10%">
          <VStack alignItems="center">
            <IconButton
              icon={
                <Icon
                  as={Ionicons}
                  name="md-chatbox-ellipses-outline"
                  size="sm"
                />
              }
              onPress={() => {
                navigation.push('View Post', params);
              }}
              renderInPortal={false}
            />
            <IconButton
              icon={
                <Icon as={Ionicons} name="md-ellipsis-horizontal" size="sm" />
              }
              onPress={() => {
                navigation.push('View Post', params);
              }}
              renderInPortal={false}
            />
          </VStack>
        </Box>
      </HStack>
    </Stack>
  );
};

function bodyText(text) {
  return (
    <Box>
      <Divider />
      <Text numberOfLines={5}>{text}</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  postBodyBoundaries: {
    minHeight: '10%',
    maxHeight: 200,
  },
});

export default Post;
