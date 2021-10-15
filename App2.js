import React from 'react';
import { NativeBaseProvider } from 'native-base/src/core/NativeBaseProvider';
import Login from './components/authLogin/login';
import Home from './components/home/home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostForm from './components/posts/postForm';
import { StateProvider } from './store/store';
import ViewPost from './components/posts/viewPost';

const Stack = createNativeStackNavigator();

export default function App2() {
  const initialState = {
    user: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeUser':
        return {
          ...state,
          user: action.user,
        };

      default:
        return state;
    }
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="Home"
              component={Home}
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
