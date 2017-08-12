import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-fc435.cloudfunctions.net';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { phone: '', error: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // ES7 would be handleSubmit = async () =>
  async handleSubmit() {
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
      await axios.post(`${ROOT_URL}/requestOTP`, { phone: this.state.phone });
      this.setState({ error: '' });
    } catch (err) {
      this.setState({ error: 'Invalid number' });
    }
  }

  //  handleSubmitPromise() {
  //   axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
  //     .then(() => {
  //       axios.post(`${ROOT_URL}/requestOTP`, { phone: this.state.phone });
  //     });
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
          <Text style={{ color: 'red', paddingLeft: 18 }}>{this.state.error}</Text>
        </View>
        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}

export default SignUpForm;
