import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Post from '../posts/post';
import { getPosts } from '../../api/post';
import { Fab, FlatList, Icon, View } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { serializePost } from '../../util/serialize';

const Home = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getPosts().then(snapshot => {
      let docs = snapshot.docs;
      setPosts(docs);
      setLastPost(docs[docs.length - 1]);
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    if (!lastPost && posts.length === 0) {
      getPosts(lastPost).then(snapshot => {
        let docs = snapshot.docs;
        setPosts(docs);
        setLastPost(docs[docs.length - 1]);
      });
    } else if (route.params?.newPost) {
      navigation.setParams({ newPost: false });
      getPosts().then(snapshot => {
        let docs = snapshot.docs;
        setPosts(docs);
        setLastPost(docs[docs.length - 1]);
      });
    }
  }, [posts, refreshing, route.params?.newPost]);

  function getPostList() {
    return (
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={post => (
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.push('View Post', serializePost(post));
            }}>
            <View>{Post(navigation, serializePost(post))}</View>
          </TouchableWithoutFeedback>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={100}
        onEndReached={() => {
          getPosts(lastPost).then(additionalPosts => {
            let docs = additionalPosts.docs;
            setPosts([...posts, ...docs]);
            setLastPost(docs[docs.length - 1]);
          });
        }}
      />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {getPostList()}
      <Fab
        position="absolute"
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="lg" />}
        onPress={() => navigation.navigate('New Post')}
        renderInPortal={false}
      />
    </View>
  );
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
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 42,
  },
});

export default Home;
