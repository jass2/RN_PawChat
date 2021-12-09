import React from 'react';
import { StyleSheet } from 'react-native';
import { Box, Divider, HStack, Icon, IconButton, Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getUserFromLogin } from '../../api/user';
import { useStateValue } from '../../store/store';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { timeSince } from '../../util/date';

const Comment = ({ navigation, comment, onClickActions }) => {
  const [{ viewingUser }, dispatch] = useStateValue();
  return (
    <Box
      my="2"
      mx="2"
      space={2}
      rounded="lg"
      borderColor="coolGray.200"
      borderWidth="1">
      <HStack rounded="md">
        <Box w="85%">
          <Text my="2" mx="2" fontSize="md">
            {comment.text}
          </Text>
        </Box>
        <Box w="15%" alignItems="center" justifyContent="center">
          <IconButton
            style={styles.alignTextEnd}
            icon={
              <Icon as={Ionicons} name="ellipsis-horizontal-sharp" size="xs" />
            }
            onPress={onClickActions}
          />
        </Box>
      </HStack>
      <HStack mx="4">
        <Divider color="black" w="100%" inset={true} insetType="middle" />
      </HStack>
      <HStack>
        <Pressable
          my="2"
          mx="2"
          onPress={() => {
            getUserFromLogin(comment.poster).then(profile => {
              let u = profile.docs[0].data();
              dispatch({
                type: 'viewUser',
                viewingUser: u,
              });
              navigation.navigate('Profile', {
                p: [],
                hp: true,
                lp: null,
              });
            });
          }}>
          <Text fontSize="sm" mx="2" my="2">
            {comment.poster}
          </Text>
        </Pressable>
        <Text my="2" mx="2" w="50%" style={styles.alignTextEnd} fontSize="xs">
          {timeSince(comment.timestamp.toDate())}
        </Text>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  alignTextEnd: {
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  commentCard: {
    borderColor: '#000000',
    borderWidth: 1,
    paddingBottom: 5,
  },
});

export default Comment;
