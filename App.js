/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBRECcflbzGvEILeINjZoM7JD5R4wX1S04',
  authDomain: 'semesterproj-36773.firebaseapp.com',
  databaseURL: 'https://semesterproj-36773.firebaseio.com',
  projectId: 'semesterproj-36773',
  storageBucket: 'semesterproj-36773.appspot.com',
  messagingSenderId: '926402690323',
  appId: '1:926402690323:web:bb346f3baeff8c32322ee6',
  measurementId: 'G-L83WWZY0JG',
};

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text> Hi Emma H Smith</Text>
      {/*<ScrollView*/}
      {/*  contentInsetAdjustmentBehavior="automatic"*/}
      {/*  style={backgroundStyle}>*/}
      {/*  <View*/}
      {/*    style={{*/}
      {/*      backgroundColor: isDarkMode ? Colors.black : Colors.white,*/}
      {/*    }}>*/}
      {/*    <Section title="Step One">*/}
      {/*      Edit <Text style={styles.highlight}>App.js</Text> to change this*/}
      {/*      screen and then come back to see your edits.*/}
      {/*    </Section>*/}
      {/*    <Section title="See Your Changes">*/}
      {/*      <ReloadInstructions />*/}
      {/*    </Section>*/}
      {/*    <Section title="Debug">*/}
      {/*      <DebugInstructions />*/}
      {/*    </Section>*/}
      {/*    <Section title="Learn More">*/}
      {/*      Read the docs to discover what to do next:*/}
      {/*    </Section>*/}
      {/*    <LearnMoreLinks />*/}
      {/*  </View>*/}
      {/*</ScrollView>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
