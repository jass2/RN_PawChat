import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Post from './post';
import Comment from './comment';
import { Button, FlatList, Text, TextArea, View } from 'native-base';
import { getComments, postNewComment } from '../../api/comment';
import { serializeComment } from '../../util/serialize';
import { useStateValue } from '../../store/store';
import { postNewPost } from '../../api/post';

const ViewPost = ({ route }) => {
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
    console.log(route.params);
    if (!lastComment && comments.length === 0 && hasComments) {
      getComments(route.params.id, lastComment).then(snapshot => {
        let docs = snapshot.docs;
        setComments(docs);
        console.log(docs.length);
        setHasComments(docs.length > 0);
        setLastComment(docs[docs.length - 1]);
      });
    } else if (postComment) {
      getComments(route.params.id).then(snapshot => {
        let docs = snapshot.docs;
        console.log(docs);
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
      {Post(route.params)}
      <Text>Comments</Text>
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
          <TouchableWithoutFeedback onPress={() => {}}>
            <View>{Comment(serializeComment(comment))}</View>
          </TouchableWithoutFeedback>
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

const styles = StyleSheet.create({});

export default ViewPost;
