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
  Spacer,
  Stack,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function Post({ navigation, params, onClickActions }) {
  return (
    <Stack
      class={styles.postBodyBoundaries}
      my="2"
      mx="2"
      space={2}
      key={params.id}
      rounded="lg"
      borderColor="coolGray.200"
      borderWidth="1">
      <VStack space={2}>
        <Box bg={params.color ? params.color : 'blue.500'}>
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
                onPress={onClickActions}
              />
            </VStack>
          </Box>
        </HStack>
        <Spacer />
      </VStack>
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
