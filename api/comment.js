import firestore from '@react-native-firebase/firestore';

export const commentRef = firestore()
  .collection('comment')
  .orderBy('timestamp', 'asc')
  .limit(10);

export const addCommentRef = firestore().collection('comment');
export const addReportRef = firestore().collection('report');

function getPostRef(postId) {
  return firestore().collection('posts').doc(postId);
}

function getCommentRef(commentId) {
  return firestore().collection('comment').doc(commentId);
}

export async function getComments(postId, startAfter) {
  return startAfter
    ? commentRef
        .where('parent', '==', getPostRef(postId))
        .startAfter(startAfter)
        .get()
    : commentRef.where('parent', '==', getPostRef(postId)).get();
}

export async function postNewComment(postId, body, user) {
  let ts = firestore.FieldValue.serverTimestamp();
  return addCommentRef.add({
    parent: getPostRef(postId),
    poster: user.email.split('@')[0],
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

export async function removeComment(commentId, message, user) {
  let ts = firestore.FieldValue.serverTimestamp();
  return getCommentRef(commentId).update({
    removed: 1,
    removedTimestamp: ts,
    removedBy: user.email.split('@')[0],
  });
}
