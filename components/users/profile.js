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
  useDisclose, Spacer,
} from "native-base";
import { useStateValue } from '../../store/store';
import InfoCard from './infoCard';
import Post from '../posts/post';
import { serializePost } from '../../util/serialize';
import { getPostRef, getPosts, getPostsForUser } from '../../api/post';
import ActionSheetReportDelete from '../../util/actionSheetReportDelete';
import { postNewReport } from '../../api/report';

//      {/*image.getDownloadURL().then((url) => this.setState({ profileimage: url }));*/}

const Profile = ({ navigation }) => {
  const [{ user }] = useStateValue();
  const [{ isAdmin }] = useStateValue();
  const [{ viewingUser }, dispatch] = useStateValue();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState();
  const [selectedPost, setSelectedPost] = useState();

  useEffect(() => {
    if (!lastPost && posts.length === 0) {
      getPostsForUser(viewingUser.username, lastPost).then(snapshot => {
        let docs = snapshot.docs;
        setPosts(snapshot.docs);
        setLastPost(docs[docs.length - 1] ? docs[docs.length - 1] : 'no posts');
      });
    } else if (selectedPost) {
      onOpen();
    }
  }, [viewingUser, posts, selectedPost]);

  function getPostList() {
    return (
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={post => (
          <Post
            navigation={navigation}
            params={serializePost(post)}
            onClickActions={() => setSelectedPost(serializePost(post))}
          />
        )}
        onEndReachedThreshold={100}
        onEndReached={() => {
          getPostsForUser(viewingUser.username, lastPost).then(
            additionalPosts => {
              let docs = additionalPosts.docs;
              setPosts([...posts, ...docs]);
              setLastPost(docs[docs.length - 1]);
            }
          );
        }}
      />
    );
  }

  async function reportPost(message) {
    await postNewReport(selectedPost.id, message, user, getPostRef);
    setSelectedPost(null);
  }

  async function removePost() {
    await removePost(selectedPost.id, user).then(() => {
      setSelectedPost(null);
      onClose();
    });
  }

  return (
    <VStack rounded="md" my="2" mx="2">
      <InfoCard
        profile={viewingUser}
        canEdit={viewingUser.email === user.email}
      />
      {viewingUser && (
        <View>
          <Spacer />
          <Text>
            {posts && posts.length > 0
              ? 'Viewing ' + posts.length + ' posts.'
              : 'No posts!'}
          </Text>
          {posts && posts.length > 0 && getPostList()}
        </View>
      )}
      <ActionSheetReportDelete
        isOpen={isOpen}
        onClose={onClose}
        type="Post"
        postReport={reportPost}
        removeItem={removePost}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({});

export default Profile;
