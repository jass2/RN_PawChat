import firestore from '@react-native-firebase/firestore';

export const commentRef = firestore()
  .collection('comment')
  .orderBy('timestamp', 'asc')
  .limit(10);

export const addCommentRef = firestore().collection('comment');

function getPostRef(postId) {
  return firestore().collection('post').doc(postId);
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
  });
}
