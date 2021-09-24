import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';

export const postRef = firestore().collection('posts');

const Home = ({ user, signOut }) => {
  const [db, setDb] = useState(firebase.firestore());
  const [ref, setRef] = useState(db.collection('posts'));

  const [postPage, setPostPage] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      var getOptions = {
        source: 'server',
      };
      let p = await ref
        .get(getOptions)
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.id, ' => ', doc.data());
          });
        })
        .catch(error => {
          console.log('Error getting documents: ', error);
        });
      console.log(p);
      setPosts(p);
    }
    getPosts().then(r => console.log(r + ' is r'));
  }, [posts, ref]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Welcome {user.email}</Text>
        <Text>{posts}</Text>
        <Button onPress={signOut} title="Sign Out" />
        <Button onPress={() => addPost()} title="AddSamplePost" />
        {renderButtons()}
      </ScrollView>
    </SafeAreaView>
  );

  async function addPost() {
    await postRef.add({
      post: 'Hi Test RN post',
      poster: 'jass2',
      text: 'Wow estse',
      time: '2019-12-20 23:40:16 +0000',
    });
    setPosts([]);
  }

  function renderButtons() {
    return <Text>Hi</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default Home;
