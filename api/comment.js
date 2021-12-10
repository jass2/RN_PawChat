import firestore from '@react-native-firebase/firestore';
import { getPostRef } from './post';

export const commentRef = firestore()
  .collection('comment')
  .where('removed', '==', 0)
  .orderBy('timestamp', 'asc')
  .limit(10);

export const addCommentRef = firestore().collection('comment');
export const addReportRef = firestore().collection('report');

export function getCommentRef(commentId) {
  return firestore().collection('comment').doc(commentId);
}

export async function getComments(postId, startAfter) {
  let postRef = getPostRef(postId);
  return startAfter
    ? commentRef.where('parent', '==', postRef).startAfter(startAfter).get()
    : commentRef.where('parent', '==', postRef).get();
}

export async function postNewComment(postId, body, user) {
  let ts = firestore.FieldValue.serverTimestamp();
  return addCommentRef.add({
    parent: getPostRef(postId),
    poster: user.email.split('@')[0],
    posterImg: user.photoURL,
    text: body,
    timestamp: ts,
    removed: 0,
    removedTimestamp: null,
    removedBy: '',
    reported: 0,
  });
}

export async function postNewReport(commentId, message, user) {
  let ts = firestore.FieldValue.serverTimestamp();
  let reportRef = await addReportRef.add({
    parent: getCommentRef(commentId),
    reporter: user.email.split('@')[0],
    reason: message,
    timestamp: ts,
    status: 'REVIEW',
  });

  return getCommentRef(commentId).update({ reported: reportRef });
}

export async function removeComment(commentId, user) {
  let ts = firestore.FieldValue.serverTimestamp();
  return getCommentRef(commentId).update({
    removed: 1,
    removedTimestamp: ts,
    removedBy: user.email.split('@')[0],
  });
}
