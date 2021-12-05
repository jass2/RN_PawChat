import React, { useEffect, useState } from 'react';
import { RefreshControl, StatusBar, StyleSheet } from 'react-native';
import Post from '../posts/post';
import { postNewReport } from '../../api/report';
import { getPosts, removePost, getPostRef } from '../../api/post';
import {
  Actionsheet,
  Box,
  Button,
  Fab,
  FlatList,
  FormControl,
  Icon,
  Input,
  Modal,
  Text,
  useDisclose,
  View,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { serializePost } from '../../util/serialize';
import { useStateValue } from '../../store/store';

const Home = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [{ user, loggedInProfile, viewingUser }, dispatch] = useStateValue();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [reportMessage, setReportMessage] = useState();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = React.useState(null);

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
    } else if (selectedPost) {
      onOpen();
    }
  }, [posts, refreshing, route.params?.newPost, selectedPost, viewingUser]);

  const changeReportMessage = (event: any) =>
    setReportMessage(event.nativeEvent.text);

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
    <View flex={1} mb="10">
      {getPostList()}
      <Fab
        position="absolute"
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="lg" />}
        onPress={() => navigation.navigate('New Post')}
        renderInPortal={false}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => setShowReportModal(true)}>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: 'gray.300',
                }}>
                Report
              </Text>
            </Box>
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={() => {
              setShowDeleteModal(true);
            }}>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: 'gray.300',
                }}>
                Delete
              </Text>
            </Box>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Modal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setSelectedPost(null);
        }}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Report Post</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Report reason:</FormControl.Label>
              <Input
                type="body"
                value={reportMessage}
                onChange={changeReportMessage}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowReportModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  postNewReport(
                    selectedPost.id,
                    reportMessage,
                    user,
                    getPostRef
                  ).then(() => {
                    setShowReportModal(false);
                    setReportMessage();
                  });
                }}>
                Report
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedPost(null);
        }}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Delete Post</Modal.Header>
          <Modal.Body>
            <Text>Are you sure that you want to delete this post?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowDeleteModal(false);
                  setSelectedPost(null);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  removePost(selectedPost.id, user).then(() => {
                    setShowDeleteModal(false);
                    setSelectedPost(null);
                  });
                }}>
                Remove
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
