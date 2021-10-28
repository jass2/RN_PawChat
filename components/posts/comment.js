import React from 'react';
import { StyleSheet } from 'react-native';
import { Center, Text } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Comment = (navigation, params) => {
  return (
    <Center key={params.id} rounded="md" shadow={3} minH={100} maxH={300}>
      <Text>{params.text}</Text>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('pressed');
          navigation.navigate('Profile', params.poster);
        }}>
      <Text>
        {params.poster}
      </Text>
      </TouchableWithoutFeedback>
      <Text>{params.timestamp}</Text>
    </Center>
  );
};

const styles = StyleSheet.create({});

export default Comment;
