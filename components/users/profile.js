import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import {
  Text,
  Image,
  VStack,
  FlatList,
  Box,
  HStack,
  View,
  useDisclose,
  Spacer,
} from 'native-base';
import { useStateValue } from '../../store/store';
import InfoCard from './infoCard';
import Post from '../posts/post';
import { getPostRef, getPostsForUser } from '../../api/post';
import ActionSheetReportDelete from '../../util/actionSheetReportDelete';
import { postNewReport } from '../../api/report';

//      {/*image.getDownloadURL().then((url) => this.setState({ profileimage: url }));*/}

const Profile = ({ route, navigation }) => {
  const [{ user }] = useStateValue();
  const [{ viewingUser }] = useStateValue();
  const { isOpen, onOpen, onClose } = useDisclose();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostsForUser(viewingUser.username).then(additionalPosts => {
      setPosts(additionalPosts.docs);
    });
  }, [viewingUser]);

  const [lastPost, setLastPost] = useState(null);
  useEffect(() => {
    setLastPost(posts[posts.length - 1]);
    return () => {
      setLastPost(null);
    };
  }, [posts]);

  const [selectedPost, setSelectedPost] = useState();
  useEffect(() => {
    onOpen();
    return () => {
      setSelectedPost(null);
    };
  }, [onOpen]);

  const [hasPosts, setHasPosts] = useState(true);
  useEffect(() => {
    setHasPosts(posts.length > 0);
    return () => {
      setHasPosts(true);
    };
  }, [posts]);

  // useEffect(() => {
  //   if (!lastPost && hasPosts) {
  //     getPostsForUser(viewingUser.username, lastPost).then(snapshot => {
  //       let docs = snapshot.docs;
  //       setPosts(snapshot.docs);
  //       setLastPost(snapshot.docs[snapshot.docs.length - 1]);
  //       setHasPosts(docs.length > 0);
  //     });
  //   } else if (selectedPost) {
  //   }
  //   return function cleanup() {
  //     console.log('dude why');
  //     setPosts([]);
  //     setSelectedPost(null);
  //     setHasPosts(true);
  //   };
  // });

  function getPostList() {
    return (
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={post => (
          <Post
            post={post.item.data()}
            navigation={navigation}
            onClickActions={() => setSelectedPost(post.id)}
          />
        )}
        initialNumToRender={10}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
        onEndReached={() => {
          if (!this.onEndReachedCalledDuringMomentum) {
            getPostsForUser(viewingUser.username, lastPost).then(
              additionalPosts => {
                setPosts([...posts, ...additionalPosts.docs]);
              }
            );
          }
          this.onEndReachedCalledDuringMomentum = true;
        }}
      />
    );
  }

  async function reportPost(message) {
    await postNewReport(selectedPost, message, user, getPostRef);
    setSelectedPost(null);
  }

  async function removePost() {
    await removePost(selectedPost, user).then(() => {
      setSelectedPost(null);
      onClose();
    });
  }

  async function onActionClose() {
    setSelectedPost(null);
    onClose();
  }

  return (
    <VStack rounded="md" my="2" mx="2">
      <InfoCard
        profile={viewingUser}
        canEdit={viewingUser.email === user.email}
      />
      {hasPosts && (
        <View>
          <Spacer />
          <Text>
            {hasPosts ? 'Viewing ' + posts.length + ' posts.' : 'No posts!'}
          </Text>
          {getPostList()}
        </View>
      )}
      {selectedPost && (
        <ActionSheetReportDelete
          isOpen={isOpen}
          onClose={onActionClose}
          type="Post"
          postReport={reportPost}
          removeItem={removePost}
        />
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({});

export default Profile;
