import React, { useEffect, useState } from 'react';
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider';
import Login from './components/authLogin/login';
import Home from './components/home/home';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostForm from './components/posts/postForm';
import { StateProvider, useStateValue } from './store/store';
import ViewPost from './components/posts/viewPost';
import Profile from './components/users/profile';
import { LogBox } from 'react-native';
import UserList from './components/users/userList';
import ReportedPosts from './components/posts/reportedPosts';
import ProfileForm from './components/users/profileForm';
import { red } from 'react-native-reanimated/src/reanimated2/Colors';

LogBox.ignoreLogs(['Reanimated 2']);
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App2() {
  const initialState = {
    user: {},
    viewingUser: {},
    loggedInProfile: {},
    isAdmin: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeUser':
        return {
          ...state,
          user: action.user,
        };
      case 'viewUser':
        return {
          ...state,
          viewingUser: action.viewingUser,
        };
      case 'changeProfile':
        return {
          ...state,
          loggedInProfile: action.loggedInProfile,
        };
      case 'setIsAdmin':
        return {
          ...state,
          isAdmin: action.isAdmin,
        };
      default:
        return state;
    }
  };

  function HomeWrap() {
    const [{ isAdmin }] = useStateValue();
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="My Profile" component={Profile} />
        <Drawer.Screen name="Users" component={UserList} />
        {isAdmin && (
          <Drawer.Screen
            name="Admin - Reported Posts"
            component={ReportedPosts}
          />
        )}
      </Drawer.Navigator>
    );
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="HomeWrap"
              component={HomeWrap}
              options={{ header: () => null }}
            />
            <Stack.Screen name="New Post" component={PostForm} />
            <Stack.Screen name="View Post" component={ViewPost} />
            <Stack.Screen name="View User Profile" component={Profile} />
            <Stack.Screen name="Edit Profile" component={ProfileForm} />
          </Stack.Navigator>
        </StateProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
