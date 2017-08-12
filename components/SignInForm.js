import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-one-time-password-fc435.cloudfunctions.net';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      code: '',
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios.post(`${ROOT_URL}/verifyOTP`,
      {
        phone: this.state.phone,
        code: this.state.code,
      })
      .then(({ data }) => {
        this.setState({ phone: '', code: 'Your are good to go!' });
        firebase.auth().signInWithCustomToken(data.token);
      })
      .catch(() => {
        this.setState({ error: 'Wrong code' });
      });
  }

  // async handleSubmitAsync() {
  //   const { phone, code } = this.state;
  //   try {
  //     let response = await axios.post(`${ROOT_URL}/verifyOTP`, { phone, code });
  //     this.setState({ phone: '', code: 'Your are good to go!' });
  //   } catch (err) {
  //     this.setState({ error: 'Wrong code' });
  //   }
  // }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>

          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone, error: '' })}
          />

          <FormLabel>Enter Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code, error: '' })}
          />
          <Text style={{ color: 'red', paddingLeft: 18 }}>{this.state.error}</Text>

        </View>
        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}

export default SignInForm;
