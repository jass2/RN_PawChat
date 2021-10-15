import React from 'react';
import { StyleSheet } from 'react-native';
import { Center, Text } from 'native-base';

const Comment = params => {
  return (
    <Center key={params.id} rounded="md" shadow={3} minH={100} maxH={300}>
      <Text>{params.text}</Text>
      <Text>{params.poster}</Text>
      <Text>{params.timestamp}</Text>
    </Center>
  );
};

const styles = StyleSheet.create({});

export default Comment;
