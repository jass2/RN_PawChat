import firestore from '@react-native-firebase/firestore';

export const userRef = firestore().collection('users');

export async function getUserFromLogin(username) {
  return userRef.where('username', '==', username).get();
}
