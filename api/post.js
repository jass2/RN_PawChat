import firestore from '@react-native-firebase/firestore';

export const postRef = firestore()
  .collection('posts')
  .orderBy('time', 'desc')
  .limit(15);

export const addPostRef = firestore().collection('posts');

export async function getPosts(startAfter) {
  return startAfter ? postRef.startAfter(startAfter).get() : postRef.get();
}

export async function postNewPost(title, body, photo, user) {
  console.log(user);
  let ts = firestore.FieldValue.serverTimestamp();
  console.log(ts);
  return addPostRef.add({
    poster_id: user.email.split('@')[0],
    text: body,
    title: title,
    comments_allowed: true,
  });
}
