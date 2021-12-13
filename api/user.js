import firestore from '@react-native-firebase/firestore';

export const userRef = firestore().collection('users');

export const defaultRoleRef = firestore()
  .collection('roles')
  .doc('CQnrViJhS74UUNHaFudP');

export function getRoles() {
  return firestore().collection('roles');
}

export async function getUserFromLogin(username) {
  return userRef.where('username', '==', username).get();
}

export async function isAdmin(user) {
  let role = await user.data().role.get();
  return role.data().name === 'administrator';
}

export function getUsers() {
  return userRef;
}

export function getUserRef(user) {
  return firestore().collection('users').where('username', '==', user);
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
    photoURL: user.photoURL,
    username: user.email.split('@')[0],
  };

  let profile = await userRef.doc(user.email.split('@')[0]).get();
  if (!profile.exists) {
    await userRef.doc(user.email.split('@')[0]).set(defaultProfile);
    profile = await userRef.doc(user.email.split('@')[0]).get();
  }
  return profile;
}

export async function updateUserProfile(profile, user, username) {
  let ref = userRef.doc(username);
  console.log(profile);
  return ref.set(profile, { merge: true });
}
