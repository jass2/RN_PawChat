import firestore from '@react-native-firebase/firestore';

export const userRef = firestore().collection('users');
export const defaultRoleRef = firestore()
  .collection('roles')
  .doc('CQnrViJhS74UUNHaFudP');
export async function getUserFromLogin(username) {
  return userRef.where('username', '==', username).get();
}

export async function getUserProfile(user) {
  const defaultProfile = {
    blocked: false,
    email: user.email,
    first: '',
    graduating: '',
    major: '',
    role: defaultRoleRef,
    bio: '',
    username: user.email.split('@')[0],
  };

  let profile;

  profile = await userRef.doc(user.email.split('@')[0]).get();
  if (!profile.exists) {
    await userRef.doc(user.email.split('@')[0]).set(defaultProfile);
    profile = await userRef.doc(user.email.split('@')[0]).get();
  }
  console.log(profile);
  return profile;
}