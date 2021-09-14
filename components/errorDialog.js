import { Alert } from 'react-native';

export default function ErrorDialog(title, message) {
  Alert.alert(title, message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'OK', onPress: () => console.log('OK Pressed') },
  ]);
}
