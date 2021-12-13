import firestore from '@react-native-firebase/firestore';
import { postColors } from '../util/colors';

export const postRef = firestore()
  .collection('posts')
  .where('removed', '==', 0)
  .orderBy('timestamp', 'desc')
  .limit(40);

export const addPostRef = firestore().collection('posts');

export function getPostRef(postId) {
  return firestore().collection('posts').doc(postId);
}

export async function getPosts(startAfter) {
  return startAfter ? postRef.startAfter(startAfter).get() : postRef.get();
}

export function getPostsForUser(user, startAfter) {
  const userPostRef = firestore()
    .collection('posts')
    .where('poster_id', '==', `${user}`)
    .orderBy('timestamp', 'desc')
    .limit(40);
  return startAfter ? userPostRef.startAfter(startAfter) : userPostRef;
}

export function getReportedPosts(startAfter) {
  let reportedRef = firestore()
    .collection('report')
    .orderBy('timestamp', 'desc')
    .limit(25);
  return startAfter ? reportedRef.startAfter(startAfter) : reportedRef;
}

export async function postNewPost(title, body, photo, user) {
  let ts = firestore.FieldValue.serverTimestamp();

  return addPostRef.add({
    poster_id: user.email.split('@')[0],
    text: body,
    title: title,
    comments_allowed: true,
    timestamp: ts,
    removed: 0,
    removedTimestamp: null,
    removedBy: '',
    reported: 0,
    color: postColors[Math.floor(Math.random() * postColors.length)],
  });
}

export async function removePost(postId, user) {
  let ts = firestore.FieldValue.serverTimestamp();
  return getPostRef(postId).set(
    {
      removed: 1,
      removedTimestamp: ts,
      removedBy: user.email.split('@')[0],
    },
    { merge: true }
  );
}
