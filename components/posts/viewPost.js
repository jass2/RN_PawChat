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
  Stack,
  Text,
  TextArea,
  View,
  VStack,
} from 'native-base';
import { getComments, postNewComment } from '../../api/comment';
import { serializeComment } from '../../util/serialize';
import { useStateValue } from '../../store/store';

const ViewPost = ({ navigation, route }) => {
  const [comments, setComments] = useState([]);
  const [lastComment, setLastComment] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [postComment, setPostComment] = useState(false);
  const [hasComments, setHasComments] = useState(true);
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
    }
  }, [comments, refreshing, postComment]);

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

  return (
    <View>
      <Stack
        class={styles.postBodyBoundaries}
        my="2"
        space={2}
        key={route.params.id}
        rounded="lg"
        borderColor="coolGray.200"
        borderWidth="1">
        <VStack space={2}>
          <Box bg="blue.500">
            <Text ml="1" w="85%" fontSize="2xl">
              {route.params.title}
            </Text>
          </Box>
          <Box>{route.params.body && route.params.body}</Box>
          <HStack>
            <Box w="85%">
              <TouchableWithoutFeedback
                onPress={() => {
                  navigation.navigate('Profile', route.params.author);
                }}>
                <Text>{route.params.author}</Text>
              </TouchableWithoutFeedback>
            </Box>
            <Box w="15%">{route.params.timestamp}</Box>
          </HStack>
        </VStack>
      </Stack>
      <Text pb="10px">Comments</Text>
      <TextArea
        h={20}
        placeholder="Type new comment"
        w={{
          base: '70%',
          md: '25%',
        }}
        value={newComment}
        onChange={changeNewComment}
      />
      <Button onPress={makeComment}>Comment</Button>
      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        renderItem={comment => (
          <Comment navigation={navigation} params={serializeComment(comment)} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={100}
        onEndReached={() => {
          getComments(route.params.id, lastComment).then(additionalPosts => {
            let docs = additionalPosts.docs;
            setComments([...comments, ...docs]);
            setLastComment(docs[docs.length - 1]);
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  postBodyBoundaries: {
    minHeight: '10%',
  }

});

export default ViewPost;
