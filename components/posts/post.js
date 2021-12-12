import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Actionsheet,
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Spacer,
  Stack,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function Post({ navigation, onClickActions, post, postId }) {
  return (
    <Box
      class={styles.postBodyBoundaries}
      my="2"
      mx="2"
      rounded="lg"
      borderColor="coolGray.200"
      borderWidth="1">
      {post.text.length > 0 && (
        <VStack>
          <Box bg={post.color ? post.color : 'blue.500'}>
            <Text ml="1" w="85%" fontSize="2xl">
              {post.title}
            </Text>
          </Box>
          <HStack>
            <Box w="85%">{bodyText(post.text)}</Box>
            <Box w="15%" alignItems="center" justifyContent="center">
              <HStack justifyContent="center">
                <IconButton
                  icon={
                    <Icon
                      as={Ionicons}
                      name="md-chatbubble-outline"
                      size="md"
                    />
                  }
                  onPress={() => {
                    navigation.push('View Post', {
                      post: post,
                      postId: postId,
                    });
                  }}
                />
                <IconButton
                  icon={
                    <Icon
                      as={Ionicons}
                      name="ellipsis-horizontal-sharp"
                      size="md"
                    />
                  }
                  onPress={onClickActions}
                />
              </HStack>
            </Box>
          </HStack>
        </VStack>
      )}
      {!post.text && (
        <HStack bg={post.color ? post.color : 'blue.500'}>
          <Box w="85%">
            <Text ml="1" w="85%" fontSize="2xl">
              {post.title}
            </Text>
          </Box>
          <Box w="15%" alignItems="center" justifyContent="center">
            <HStack justifyContent="center">
              <IconButton
                icon={
                  <Icon as={Ionicons} name="md-chatbubble-outline" size="md" />
                }
                onPress={() => {
                  navigation.push('View Post', {
                    post: post,
                    postId: postId,
                  });
                }}
              />
              <IconButton
                icon={
                  <Icon
                    as={Ionicons}
                    name="ellipsis-horizontal-sharp"
                    size="md"
                  />
                }
                onPress={onClickActions}
              />
            </HStack>
          </Box>
        </HStack>
      )}
    </Box>
  );
}

function bodyText(text, title) {
  return title ? (
    <Text ml="1" numberOfLines={2}>
      {text}
    </Text>
  ) : (
    <Text ml="1" numberOfLines={2}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  postBodyBoundaries: {
    minHeight: '5%',
    maxHeight: 200,
  },
});

export default Post;
