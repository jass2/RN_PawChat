import React, { useEffect, useState } from "react";
import { StyleSheet } from 'react-native';
import {
  Box,
  FormControl,
  Input,
  Text,
  VStack,
  Button,
  WarningOutlineIcon,
} from 'native-base';
import { useStateValue } from '../store/store';
import { postNewPost } from '../api/post';

const PostForm = ({ navigation, route }) => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postPic, setPostPic] = useState({});
  const [{ user }] = useStateValue();

  const changeTitle = (event: any) => setPostTitle(event.nativeEvent.text);
  const changeBody = (event: any) => setPostBody(event.nativeEvent.text);

  async function makePost() {
    console.log(postTitle);
    await postNewPost(postTitle, postBody, postPic, user).then(() => {
      navigation.navigate('Home');
    });
  }

  return (
    <VStack width="90%" mx="3">
      <Text>New Post</Text>
      <Box>
        <FormControl isRequired>
          <FormControl.Label>Title</FormControl.Label>
          <Input type="title" value={postTitle} onChange={changeTitle} />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Invalid phrase or character in title.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Body (optional)</FormControl.Label>
          <Input type="body" value={postBody} onChange={changeBody} />
          <FormControl.HelperText>optional</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Invalid phrase or character in body.
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl>
          <FormControl.Label>Add Photo</FormControl.Label>
        </FormControl>
        <Button onPress={makePost} title="Submit" />
      </Box>
    </VStack>
  );
};

const styles = StyleSheet.create({});

export default PostForm;
