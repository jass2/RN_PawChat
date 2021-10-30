import firestore from '@react-native-firebase/firestore';

export const postRef = firestore()
  .collection('posts')
  .where('removed', '==', 0)
  .orderBy('timestamp', 'desc')
  .limit(10);

export const addPostRef = firestore().collection('posts');
export const deletePostRef = firestore().collection('deleted_posts');
export const addReportRef = firestore().collection('report');

function getPostRef(postId) {
  return firestore().collection('posts').doc(postId);
}

export async function getPosts(startAfter) {
  return startAfter ? postRef.startAfter(startAfter).get() : postRef.get();
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
  });
}

export async function postNewReport(postId, message, user) {
  let ts = firestore.FieldValue.serverTimestamp();
  let reportRef = await addReportRef.add({
    parent: getPostRef(postId),
    reporter: user.email.split('@')[0],
    reason: message,
    timestamp: ts,
    status: 'REVIEW',
  });

  return getPostRef(postId).update({ reported: reportRef });
}

export async function removePost(postId, user) {
  let ts = firestore.FieldValue.serverTimestamp();
  return getPostRef(postId).update({
    removed: 1,
    removedTimestamp: ts,
    removedBy: user.email.split('@')[0],
  });
}
