import firestore from '@react-native-firebase/firestore';

export const addReportRef = firestore().collection('report');

export async function postNewReport(id, message, user, type) {
  let ts = firestore.FieldValue.serverTimestamp();

  let reportRef = await addReportRef.add({
    parent: type(id),
    reporter: user.email.split('@')[0],
    reason: message,
    timestamp: ts,
    status: 'REVIEW',
  });

  return type(id).update({ reported: reportRef });
}
