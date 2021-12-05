import React from 'react';
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider';
import Login from './components/authLogin/login';
import Home from './components/home/home';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostForm from './components/posts/postForm';
import { StateProvider } from './store/store';
import ViewPost from './components/posts/viewPost';
import Profile from './components/users/profile';
import { LogBox } from 'react-native';

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

  function homeWrap() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
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
              component={homeWrap}
              options={{ header: () => null }}
            />
            <Stack.Screen name="New Post" component={PostForm} />
            <Stack.Screen name="View Post" component={ViewPost} />
          </Stack.Navigator>
        </StateProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
