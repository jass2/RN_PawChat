import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import {
  Text,
  VStack,
  FlatList,
  View,
  useDisclose,
  Divider,
} from 'native-base';
import { useStateValue } from '../../store/store';
import InfoCard from './infoCard';
import Post from '../posts/post';
import { getPostRef, getPostsForUser } from '../../api/post';
import ActionSheetReportDelete from '../../util/actionSheetReportDelete';
import { postNewReport } from '../../api/report';
import { getUserProfile, getUserRef } from '../../api/user';

const Profile = ({ navigation, route }) => {
  const [{ user }] = useStateValue();
  const [selectedUser, setSelectedUser] = useState();
  useEffect(() => {
    const u = route.params ? route.params : user.email.split('@')[0];
    const updateUser = getUserRef(u).onSnapshot(u => {
      setSelectedUser(u.docs[0].data());
    });

    return () => {
      updateUser();
    };
  }, [route.params]);

  const { isOpen, onOpen, onClose } = useDisclose();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const u = route.params ? route.params : user.email.split('@')[0];

    const p = getPostsForUser(u).onSnapshot(additionalPosts => {
      setPosts(additionalPosts.docs);
    });

    return () => {
      p();
    };
  });

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
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={post => {
          if (post.item.data().removed === 0) {
            return (
              <Post
                post={post.item.data()}
                postId={post.item.id}
                navigation={navigation}
                onClickActions={() => setSelectedPost(post.item.id)}
              />
            );
          }
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
      {selectedUser && (
        <View h="100%">
          <InfoCard
            navigation={navigation}
            profile={selectedUser}
            canEdit={selectedUser.email === user.email}
          />
          {hasPosts && (
            <View>
              <Text py="3" fontSize="md">
                {hasPosts ? "User's Posts" : 'No posts!'}
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
        </View>
      )}
    </VStack>
  );
};

export default Profile;
