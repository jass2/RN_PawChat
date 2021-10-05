import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import {
  Box,
  FormControl,
  Input,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import { useStateValue } from '../store/store';
import { postNewPost } from '../api/post';

const PostForm = ({ navigation, route }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postPic, setPostPic] = useState({});
  const [{ user }] = useStateValue();

  function makePost() {
    postNewPost(postTitle, postBody, postPic, user).then(r => console.log(r));
    navigation.navigate('Home');
  }

  return (
    <VStack width="90%" mx="3">
      <Text>New Post</Text>
      <Box>
        <FormControl isRequired>
          <FormControl.Label>Title</FormControl.Label>
          <Input type="title" onChange={title => setPostTitle(title)} />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Invalid phrase or character in title.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Body (optional)</FormControl.Label>
          <Input type="body" onChange={body => setPostBody(body)} />
          <FormControl.HelperText>optional</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Invalid phrase or character in body.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl>
          <FormControl.Label>Add Photo</FormControl.Label>
        </FormControl>
        <Button color="#2196F3" onPress={makePost} title="Submit" />
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({});

export default PostForm;
