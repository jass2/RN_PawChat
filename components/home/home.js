import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Button } from 'react-native';
import Post from '../post';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { getPosts } from '../../api/post';
import { View, ScrollView, Box, Fab, Icon } from 'native-base';
import { timeSince } from '../../util/date';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Home = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState(null);

  useEffect(() => {
    if (!lastPost && posts.length === 0) {
      getPosts(lastPost).then(snapshot => {
        setPosts(snapshot.docs);
        setLastPost(posts[posts.length - 1]);
      });
    }
  }, [lastPost, posts]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>{renderPosts()}</ScrollView>
      <Button onPress={() => addPost()} title="AddSamplePost" />
      <Box position="relative" h={100} w="100%">
        <Fab
          position="absolute"
          size="sm"
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="lg" />}
          onPress={() => navigation.navigate('New Post')}
        />
      </Box>
      <Button onPress={signOut} title="Sign Out" />
    </View>
  );

  async function addPost() {
    await postRef.add({
      post: 'Hi Test RN post',
      poster: 'jass2',
      text: 'Wow estse',
      time: '2019-12-20 23:40:16 +0000',
    });
    setPosts([]);
  }

  function renderPosts() {
    let rows = [];
    posts.forEach(post => {
      rows.push(
        Post({
          postUid: post.id,
          postText: post.data().text,
          postAuthor: post.data().poster_id,
          postDate: post.data().timestamp
            ? timeSince(post.data().timestamp.toDate())
            : '',
        })
      );
    });
    return rows;
  }

  async function signOut() {
    try {
      await GoogleSignin.revokeAccess();
      auth()
        .signOut()
        // eslint-disable-next-line no-alert
        .then(() => alert('Your are signed out!'));
      navigation.navigate('Login', { user: null });
    } catch (error) {
      console.error(error);
    }
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    width: '100%',
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
  },
});

export default Home;
