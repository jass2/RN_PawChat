import {
  Actionsheet,
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Text,
  View,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDisclose } from 'native-base';
import { useStateValue } from '../store/store';

const ActionSheetReportDelete = ({
  isOpen,
  onClose,
  type,
  postReport,
  removeItem,
}) => {
  const [reportMessage, setReportMessage] = useState();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const changeReportMessage = (event: any) =>
    setReportMessage(event.nativeEvent.text);

  return (
    <View>
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
      <Modal isOpen={showReportModal} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Report {type}</Modal.Header>
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
                onPress={() => setShowReportModal(false)}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  postReport(reportMessage);
                  setShowReportModal(false);
                }}>
                Report
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showDeleteModal} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Delete</Modal.Header>
          <Modal.Body>
            <Text>Are you sure that you want to delete this {type}?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  removeItem();
                  setShowDeleteModal(false);
                }}>
                Remove
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default ActionSheetReportDelete;
