import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import onSnapshot from '@react-native-firebase/firestore'
import {
  Box,
  FormControl,
  Input,
  Icon,
  Text,
  VStack,
  Button,
  WarningOutlineIcon,
  View,
  FlatList,
  useDisclose,
  HStack,
  IconButton,
} from 'native-base';
import { getReportedPosts, removePost } from '../../api/post';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useStateValue } from '../../store/store';
import { updateReport } from '../../api/report';

const ReportedPosts = ({ navigation, route }) => {
  const [{ user }, dispatch] = useStateValue();
  const [reports, setReports] = useState([]);
  useEffect(() => {
    if (!hasPosts && reports.length === 0) {
      getReportedPosts().onSnapshot(snap => {
        setReports(snap.docs);
      });
    }
  });

  const [lastPost, setLastPost] = useState(null);
  useEffect(() => {
    setLastPost(reports[reports.length - 1]);
    return () => {
      setLastPost(null);
    };
  }, [reports]);

  const [hasPosts, setHasPosts] = useState(true);
  useEffect(() => {
    setHasPosts(reports.length > 0);
    return () => {
      setHasPosts(true);
    };
  }, [reports]);

  function removeReportedPost(postRef, report) {
    let post = postRef.id;
    return updateReport(report, 'REMOVED').then(r => {
      return removePost(post, user);
    });
  }

  function getPostList() {
    return (
      <View h="100%">
        <FlatList
          data={reports}
          keyExtractor={item => item.id}
          renderItem={report => (
            <View>
              <Box
                my="2"
                mx="2"
                rounded="lg"
                borderColor="coolGray.200"
                borderWidth="1"
                id={report.item.id}>
                <HStack>
                  <VStack w="80%" my="2" mx="2">
                    <Text>
                      {report.item.data().reporter},{' '}
                      {report.item.data().timestamp.toDate().toDateString()}
                    </Text>
                    <Text>Message: {report.item.data().reason}</Text>
                    <HStack>
                      <Text>Status: {report.item.data().status}</Text>
                    </HStack>
                  </VStack>
                  <HStack w="20%">
                    <IconButton
                      style={{ justifyContent: 'center' }}
                      icon={<Icon color="#ff0000" as={Ionicons} name="close" size="md" />}
                      onPress={async () =>
                        await removeReportedPost(
                          report.item.data().parent,
                          report.item
                        )
                      }
                    />
                    <IconButton
                      style={{ justifyContent: 'center' }}
                      icon={
                        <Icon as={Ionicons} color="#0000FF" name="arrow-forward" size="md" />
                      }
                      onPress={async () => {
                        let postRef = await report.item.data().parent.get();
                        navigation.push('View Post', {
                          post: postRef.data(),
                          postId: postRef.id,
                          navigation: navigation,
                        });
                      }}
                    />
                  </HStack>
                </HStack>
              </Box>
            </View>
          )}
          onEndReachedThreshold={100}
          onEndReached={() => {
            getReportedPosts().onSnapshot(snap => {
              setReports(snap.docs);
            });
          }}
        />
      </View>
    );
  }
  return (
    <VStack rounded="md" my="2" mx="2">
      {hasPosts && (
        <View>
          <Text>
            {hasPosts ? 'Viewing ' + reports.length + ' Reports.' : 'No Reports!'}
          </Text>
          {getPostList()}
        </View>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({});

export default ReportedPosts;
