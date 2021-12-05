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

const ViewPost = ({ navigation, route }) => {
  const [comments, setComments] = useState([]);
  const [lastComment, setLastComment] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [postComment, setPostComment] = useState(false);
  const [hasComments, setHasComments] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedComment, setSelectedComment] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [{ user }] = useStateValue();

  const changeNewComment = (event: any) =>
    setNewComment(event.nativeEvent.text);

  useEffect(() => {
    if (!lastComment && comments.length === 0 && hasComments) {
      getComments(route.params.id, lastComment).then(snapshot => {
        let docs = snapshot.docs;
        setComments(docs);
        setHasComments(docs.length > 0);
        setLastComment(docs[docs.length - 1]);
      });
    } else if (postComment) {
      getComments(route.params.id).then(snapshot => {
        let docs = snapshot.docs;
        setComments(docs);
        setLastComment(docs[docs.length - 1]);
        setHasComments(true);
        setPostComment(false);
      });
    } else if (selectedComment) {
      onOpen();
    }
  }, [comments, refreshing, postComment, selectedComment]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    getComments(route.params.id).then(snapshot => {
      let docs = snapshot.docs;
      setComments(docs);
      setLastComment(docs[docs.length - 1]);
      setRefreshing(false);
    });
  }, [route.params.id]);

  async function makeComment() {
    await postNewComment(route.params.id, newComment, user);
    setPostComment(true);
  }

  async function report(message) {
    await postNewReport(selectedComment.id, message, user, getCommentRef);
    setSelectedComment(null);
  }

  async function remove() {
    await removeComment(selectedComment.id, user).then(() => {
      setSelectedComment(null);
      onClose();
    });
  }

  return (
    <View my="2" mx="2">
      <Stack
        class={styles.postBodyBoundaries}
        space={2}
        key={route.params.id}
        rounded="lg"
        borderColor="coolGray.200"
        borderWidth="1">
        <VStack space={2}>
          <HStack bg={route.params.color} style={styles.titleAndAuthor}>
            <Text w="85%" fontSize="2xl">
              {route.params.title}
            </Text>
            <Text w="15%" h="100%" style={styles.timestampRight}>
              {route.params.author}
            </Text>
          </HStack>
          <Box>{route.params.body && route.params.body}</Box>
          <HStack>
            <Box w="50%">
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log('presst');
                  navigation.navigate('Profile', route.params.author);
                }}>
                <Text />
              </TouchableWithoutFeedback>
            </Box>
            <Box w="50%">
              <Text style={styles.timestampRight}>
                {route.params.timestamp}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Stack>
      <Stack>
        <VStack>
          <Text class={styles.alignCommentsCenter}>Comments</Text>
          <TextArea
            style={styles.alignCommentsCenter}
            w="90%"
            h={20}
            placeholder="Type new comment"
            value={newComment}
            onChange={changeNewComment}
          />
          <Button onPress={makeComment}>Comment</Button>
          <FlatList
            data={comments}
            keyExtractor={item => item.id}
            renderItem={comment => (
              <View>
                <Comment
                  navigation={navigation}
                  params={serializeComment(comment)}
                  onClickActions={() =>
                    setSelectedComment(serializeComment(comment))
                  }
                />
                <Spacer />
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReachedThreshold={100}
            onEndReached={() => {
              getComments(route.params.id, lastComment).then(
                additionalPosts => {
                  let docs = additionalPosts.docs;
                  setComments([...comments, ...docs]);
                  setLastComment(docs[docs.length - 1]);
                }
              );
            }}
          />
        </VStack>
      </Stack>
      <ActionSheetReportDelete
        isOpen={isOpen}
        onClose={onClose}
        type="Comment"
        postReport={report}
        removeItem={remove}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postBodyBoundaries: {
    minHeight: '200px',
  },
  titleAndAuthor: {
    justifyContent: 'space-between',
  },
  timestampRight: {
    textAlign: 'right',
    justifyContent: 'flex-end',
  },
  alignCommentsCenter: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default ViewPost;
