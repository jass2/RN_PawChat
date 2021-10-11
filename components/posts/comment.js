import React from 'react';
import { StyleSheet } from 'react-native';
import { Center, Text } from 'native-base';

const Comment = params => {
  return (
    <Center
      key={params.commentUid}
      rounded="md"
      shadow={3}
      minH={100}
      maxH={300}>
      <Text>{params.commentText}</Text>
      <Text>{params.commentAuthor}</Text>
      <Text>{params.commentDate}</Text>
    </Center>
  );
};

const styles = StyleSheet.create({});

export default Comment;
