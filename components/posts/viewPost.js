import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Comment from './comment';
import {
  Box,
  Button,
  FlatList,
  HStack,
  Spacer,
  Stack,
  Text,
  TextArea,
  useDisclose,
  View,
  VStack,
} from 'native-base';
import {
  getComments,
  postNewComment,
  removeComment,
  getCommentRef,
} from '../../api/comment';
import { serializeComment } from '../../util/serialize';
import { useStateValue } from '../../store/store';
import { postNewReport } from '../../api/report';
import ActionSheetReportDelete from '../../util/actionSheetReportDelete';
import { timeSince } from '../../util/date';
import { getUserFromLogin } from '../../api/user';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const ViewPost = ({ navigation, route }) => {
  const [comments, setComments] = useState([]);
  const [lastComment, setLastComment] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [postComment, setPostComment] = useState(false);
  const [hasComments, setHasComments] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedComment, setSelectedComment] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { post, postId } = route.params;
  const [{ user }] = useStateValue();
  const [{ viewingUser }, dispatch] = useStateValue();

  const changeNewComment = (event: any) =>
    setNewComment(event.nativeEvent.text);

  useEffect(() => {
    if (!lastComment && !hasComments) {
      getComments(postId, lastComment).then(snapshot => {
        let docs = snapshot.docs;
        setComments(docs);
        setHasComments(docs.length > 0);
        setLastComment(docs[docs.length - 1]);
      });
    } else if (postComment) {
      getComments(postId).then(snapshot => {
        let docs = snapshot.docs;
        setComments(docs);
        setLastComment(docs[docs.length - 1]);
        setHasComments(true);
        setPostComment(false);
      });
    } else if (selectedComment) {
      onOpen();
    }
  }, [postId, lastComment, hasComments, postComment, selectedComment]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getComments(postId).then(snapshot => {
      let docs = snapshot.docs;
      setComments(docs);
      setLastComment(docs[docs.length - 1]);
      setRefreshing(false);
    });
  }, [postId]);

  async function makeComment() {
    await postNewComment(postId, newComment, user);
    setPostComment(true);
  }

  async function report(message) {
    await postNewReport(selectedComment, message, user, getCommentRef);
    setSelectedComment(null);
  }

  async function remove() {
    await removeComment(selectedComment, user).then(() => {
      setSelectedComment(null);
      onClose();
    });
  }

  return (
    <View my="2" mx="2">
      <Stack
        class={styles.postBodyBoundaries}
        rounded="lg"
        borderColor="coolGray.200"
        borderWidth="1">
        <VStack>
          <HStack bg={post.color}>
            <Text w="85%" fontSize="2xl" my="2" mx="2">
              {post.title}
            </Text>
            <Text style={styles.timestampRight}>{post.poster_id}</Text>
          </HStack>
          <Box>
            <Text my="2" mx="2">
              {post.text && post.text}
            </Text>
          </Box>
          <HStack>
            <Box w="50%">
              <Pressable
                onPress={() => {
                  getUserFromLogin(post.poster_id).then(profile => {
                    let u = profile.docs[0].data();
                    dispatch({
                      type: 'viewUser',
                      viewingUser: u,
                    });
                    navigation.navigate('Profile', {
                      p: [],
                      hp: true,
                      lp: null,
                    });
                  });
                }}>
                <Text />
              </Pressable>
            </Box>
            <Box w="50%">
              <Text my="2" mx="2" style={styles.timestampRight}>
                {timeSince(post.timestamp.toDate())}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Stack>
      <VStack>
        <Text class={styles.alignCommentsCenter}>Comments</Text>
        <TextArea
          w="100%"
          h={20}
          placeholder="Type new comment"
          value={newComment}
          onChange={changeNewComment}
        />
        <Button onPress={makeComment}>Comment</Button>
        <View h="70%">
          <FlatList
            data={comments}
            keyExtractor={comment => comment.id}
            renderItem={comment => (
              <View>
                <Comment
                  navigation={navigation}
                  comment={comment.item.data()}
                  onClickActions={() => {
                    setSelectedComment(comment.id);
                  }}
                />
                <Spacer />
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReachedThreshold={100}
            onEndReached={() => {
              getComments(postId, lastComment).then(additionalPosts => {
                let docs = additionalPosts.docs;
                setComments([...comments, ...docs]);
                setLastComment(docs[docs.length - 1]);
              });
            }}
          />
        </View>
      </VStack>
      {selectedComment && (
        <ActionSheetReportDelete
          isOpen={isOpen}
          onClose={onClose}
          type="Comment"
          postReport={report}
          removeItem={remove}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timestampRight: {
    textAlign: 'right',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  alignCommentsCenter: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default ViewPost;
