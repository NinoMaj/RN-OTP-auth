import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyCtmNStIxtILig9L-JQ8KCL4w3bk8NfB1A',
      authDomain: 'one-time-password-fc435.firebaseapp.com',
      databaseURL: 'https://one-time-password-fc435.firebaseio.com',
      projectId: 'one-time-password-fc435',
      storageBucket: 'one-time-password-fc435.appspot.com',
      messagingSenderId: '273074995005',
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <View style={styles.container}>
        <SignUpForm />
        <SignInForm />
      </View>
    );
  }
}
