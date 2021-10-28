import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Actionsheet,
  Box,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function Post({ navigation, params }) {
  console.log(params);
  const { isOpen, onOpen, onClose } = useDisclose();

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
                  <Icon
                    as={Ionicons}
                    name="md-chatbox-ellipses-outline"
                    size="md"
                  />
                }
                onPress={() => {
                  navigation.push('View Post', params);
                }}
              />
              <IconButton
                icon={
                  <Icon as={Ionicons} name="md-chatbubble-outline" size="md" />
                }
                onPress={onOpen}
              />
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                  <Box w="100%" h={60} px={4} justifyContent="center">
                    <Text
                      fontSize="16"
                      color="gray.500"
                      _dark={{
                        color: 'gray.300',
                      }}>
                      Albums
                    </Text>
                  </Box>
                  <Actionsheet.Item>Report</Actionsheet.Item>
                  <Actionsheet.Item>Delete</Actionsheet.Item>
                </Actionsheet.Content>
              </Actionsheet>
            </VStack>
          </Box>
        </HStack>
      </VStack>
    </Stack>
  );
};

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
