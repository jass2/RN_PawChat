import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <Text>Hello, I am the homepage!</Text>
        <Button onPress={this.props.signOut}>Sign Out</Button>
      </Layout>
    );
  }
}

export default Home;
