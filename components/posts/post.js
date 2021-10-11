import React from 'react';
import { StyleSheet } from 'react-native';
import { Center, Text } from 'native-base';

const Post = params => {
  return (
    <Center key={params.postUid} rounded="md" shadow={3} minH={100} maxH={300}>
      <Text>{params.postText}</Text>
      <Text>{params.postAuthor}</Text>
      <Text>{params.postDate}</Text>
    </Center>
  );
};

const styles = StyleSheet.create({});

export default Post;
