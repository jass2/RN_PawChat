import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Actionsheet,
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Stack,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { postNewReport, removePost } from '../../api/post';
import { useStateValue } from '../../store/store';

export function Post({ navigation, params }) {
  const [{ user }] = useStateValue();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [reportMessage, setReportMessage] = useState();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const changeReportMessage = (event: any) =>
    setReportMessage(event.nativeEvent.text);

  return (
    <Stack
      class={styles.postBodyBoundaries}
      my="2"
      space={2}
      key={params.id}
      rounded="lg"
      borderColor="coolGray.200"
      borderWidth="1">
      <VStack space={2}>
        <Box bg="blue.500">
          <Text ml="1" w="85%" fontSize="2xl">
            {params.title}
          </Text>
        </Box>
        <HStack>
          <Box w="85%">{params.body && bodyText(params.body)}</Box>
          <Box w="15%" alignItems="center" justifyContent="center">
            <VStack justifyContent="center">
              <IconButton
                icon={
                  <Icon as={Ionicons} name="md-chatbubble-outline" size="md" />
                }
                onPress={() => {
                  navigation.push('View Post', params);
                }}
              />
              <IconButton
                icon={
                  <Icon
                    as={Ionicons}
                    name="ellipsis-horizontal-sharp"
                    size="md"
                  />
                }
                onPress={onOpen}
              />
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                  <Actionsheet.Item onPress={() => setShowReportModal(true)}>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                      <Text
                        fontSize="16"
                        color="gray.500"
                        _dark={{
                          color: 'gray.300',
                        }}>
                        Report
                      </Text>
                    </Box>
                  </Actionsheet.Item>
                  <Actionsheet.Item
                    onPress={() => {
                      setShowDeleteModal(true);
                    }}>
                    <Box w="100%" h={60} px={4} justifyContent="center">
                      <Text
                        fontSize="16"
                        color="gray.500"
                        _dark={{
                          color: 'gray.300',
                        }}>
                        Delete
                      </Text>
                    </Box>
                  </Actionsheet.Item>
                </Actionsheet.Content>
              </Actionsheet>
            </VStack>
          </Box>
        </HStack>
      </VStack>
      <Modal isOpen={showReportModal} onClose={() => setShowReportModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Report Post</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Report reason:</FormControl.Label>
              <Input
                type="body"
                value={reportMessage}
                onChange={changeReportMessage}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowReportModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  postNewReport(params.id, reportMessage, user).then(() => {
                    setShowReportModal(false);
                  });
                }}>
                Report
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showDeleteModal} onClose={() => showDeleteModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Delete Post</Modal.Header>
          <Modal.Body>
            <Text>Are you sure that you want to delete this post?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowDeleteModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  removePost(params.id, user).then(() => {
                    setShowDeleteModal(false);
                  });
                }}>
                Remove
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Stack>
  );
}

function bodyText(text) {
  return (
    <Text ml="1" numberOfLines={5}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  postBodyBoundaries: {
    minHeight: '10%',
    maxHeight: 200,
  },
});

export default Post;
