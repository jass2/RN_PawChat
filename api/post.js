import firestore from '@react-native-firebase/firestore';

export const postRef = firestore()
  .collection('posts')
  .orderBy('time', 'desc')
  .limit(15);

export async function getPosts(startAfter) {
  return startAfter ? postRef.startAfter(startAfter).get() : postRef.get();
}
