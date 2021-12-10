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

  function getPostList() {
    return (
      <View h="80%">
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
          onEndReachedThreshold={100}
          onEndReached={() => {
            // initialNumToRender={10}
            // onEndReachedThreshold={0.1}
            // onMomentumScrollBegin={() => {
            //   this.onEndReachedCalledDuringMomentum = false;
            // }}
            // onEndReached={() => {
            //   if (!this.onEndReachedCalledDuringMomentum) {
            getPostsForUser(viewingUser.username, lastPost).then(
              additionalPosts => {
                setPosts([...posts, ...additionalPosts.docs]);
              }
            );
            //     );
            //   }
            //   this.onEndReachedCalledDuringMomentum = true;
            // }}
          }}
        />
      </View>
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
