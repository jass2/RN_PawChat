import React, { useEffect, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { Center, Text, Image, VStack, FlatList } from 'native-base';
import { useStateValue } from '../../store/store';
import { getUserFromLogin, getUserProfile } from '../../api/user';
import InfoCard from './infoCard';
import Post from '../posts/post';
import { serializePost } from '../../util/serialize';
import { getPosts } from '../../api/post';

//      {/*image.getDownloadURL().then((url) => this.setState({ profileimage: url }));*/}

const Profile = params => {
  const [{ user }] = useStateValue();
  const [{ isAdmin }] = useStateValue();
  const [{ viewingUser }] = useStateValue();
  const [profile, setProfile] = useState();
  useEffect(() => {
    console.log(isAdmin);
    console.log(profile);
    console.log(user);
    console.log(viewingUser);
    if (!profile) {
      setProfile(viewingUser);
    }
  }, [profile, viewingUser]);
  return (
    <Center rounded="md">
      <Image
        size="xl"
        resizeMode={'contain'}
        borderRadius={100}
        source={{
          uri: 'https://pbs.twimg.com/profile_images/1177303899243343872/B0sUJIH0_400x400.jpg',
        }}
        alt="Alternate Text"
      />
      {profile && (
        <VStack>
          <Text class={styles.alignTextEnd}>{profile.email}</Text>
          <InfoCard profile={profile} />
        </VStack>
      )}
      <Text>{isAdmin}</Text>
    </Center>
  );
};

// {profile && <VStack>{getPostList()}</VStack>}
// function getPostList() {
//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={item => item.id}
//       renderItem={post => (
//         <Post
//           navigation={navigation}
//           params={serializePost(post)}
//           onClickActions={() => setSelectedPost(serializePost(post))}
//         />
//       )}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//       }
//       onEndReachedThreshold={100}
//       onEndReached={() => {
//         getPosts(lastPost).then(additionalPosts => {
//           let docs = additionalPosts.docs;
//           setPosts([...posts, ...docs]);
//           setLastPost(docs[docs.length - 1]);
//         });
//       }}
//     />
//   );
// }

const styles = StyleSheet.create({});

export default Profile;
