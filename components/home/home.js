import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Button } from 'react-native';
import Post from '../posts/post';
import { getPosts } from '../../api/post';
import { View, ScrollView, Fab, Icon } from 'native-base';
import { timeSince } from '../../util/date';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { AppBar } from '../appbar';

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
      <AppBar />
      <ScrollView>{renderPosts()}</ScrollView>
      <Fab
        position="absolute"
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="lg" />}
        onPress={() => navigation.navigate('New Post')}
        renderInPortal={false}
      />
    </View>
  );
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
