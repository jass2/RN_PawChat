import React from 'react';
import {
  HStack,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Box,
  StatusBar,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export function AppBar() {
  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />

      <Box safeAreaTop backgroundColor="#6200ee" />

      <HStack
        bg="#6200ee"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center">
        <HStack space="4" alignItems="center">
          <IconButton
            icon={<Icon size="sm" as={<Entypo name="menu" />} color="white" />}
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack space="2">
          {/*<IconButton*/}
          {/*  icon={*/}
          {/*    <Icon*/}
          {/*      as={<AntDesign name="favorite" />}*/}
          {/*      size="sm"*/}
          {/*      color="white"*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<IconButton*/}
          {/*  icon={*/}
          {/*    <Icon as={<AntDesign name="search" />} color="white" size="sm" />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<IconButton*/}
          {/*  icon={*/}
          {/*    <Icon*/}
          {/*      as={<AntDesign name="more-vert" />}*/}
          {/*      size="sm"*/}
          {/*      color="white"*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
        </HStack>
      </HStack>
    </>
  );
}

export default function () {
  return (
    <NativeBaseProvider>
      <AppBar />
    </NativeBaseProvider>
  );
}
