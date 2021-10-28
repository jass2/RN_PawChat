import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Center, Text } from 'native-base';
import { serializePost } from '../../util/serialize';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const Post = (navigation, params) => {
  console.log(params);
  return (
    <Box
      key={params.id}
      bg={{
        linearGradient: {
          colors: ['lightBlue.300', 'violet.800'],
          start: [0, 0],
          end: [1, 0],
        },
      }}
      p="12"
      rounded="xl"
      _text={{
        fontSize: 'md',
        fontWeight: 'medium',
        color: 'warmGray.50',
        textAlign: 'center',
      }}>
      <Text>{params.title}</Text>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('pressed');
          navigation.navigate('Profile', params.author);
        }}>
        <Text>{params.author}</Text>
      </TouchableWithoutFeedback>
      <Text>{params.timestamp}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({});

export default Post;
