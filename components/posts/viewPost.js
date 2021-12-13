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
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const ViewPost = ({ navigation, route }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const c = getComments(postId).onSnapshot(snapshot => {
      let docs = snapshot.docs;
      setComments(docs);
    });
    return () => {
      c();
    };
  });
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedComment, setSelectedComment] = useState(null);
  useEffect(() => {
    const o = onOpen;
    return () => {
      if (selectedComment) {
        o();
      }
    };
  });

  const [newComment, setNewComment] = useState('');
  const { post, postId } = route.params;
  const [{ user }] = useStateValue();

  const changeNewComment = (event: any) =>
    setNewComment(event.nativeEvent.text);

  async function makeComment() {
    await postNewComment(postId, newComment, user);
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
                  navigation.navigate('Profile', post.poster_id);
                }}>
                <Text />
              </Pressable>
            </Box>
            <Box w="50%">
              <Text my="2" mx="2" style={styles.timestampRight}>
                {post.timestamp && timeSince(post.timestamp.toDate())}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Stack>
      <VStack h="100%">
        <Text class={styles.alignCommentsCenter}>Comments</Text>
        <TextArea
          w="100%"
          h={20}
          placeholder="Type new comment"
          value={newComment}
          onChange={changeNewComment}
        />
        <Button onPress={makeComment}>Comment</Button>
        <View h="100%">
          <FlatList
            data={comments}
            keyExtractor={comment => comment.id}
            renderItem={comment => (
              <View>
                <Comment
                  navigation={navigation}
                  comment={comment.item.data()}
                  onClickActions={() => {
                    setSelectedComment(comment.item.id);
                  }}
                />
                <Spacer />
              </View>
            )}
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
