import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@expo/router';
import axios from 'axios';
const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };
  const handleSubmit = () => {
    //console.log(`Username: ${username}, Password: ${password}`);
    const data = {
      username: username,
      password: password,
    };
  
    //console.log(`Username: ${username}, Password: ${password}`);
  
    axios.post('https://2127-197-254-120-202.ngrok-free.app/test', data)
      .then(response => {
        console.log('Response:', response.data);
        // Handle successful response
      })
      .catch(error => {
        console.error('There was an error!', error);
        // Handle error
      });
    // Add your authentication logic here
  };

  return (
    <View style={styles.container}>
       <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry={true} // For password input
      />
    <Button
        title="Login"
        onPress={handleSubmit}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
        <Button title="Go to Settings" onPress={navigateToSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  loginButton: {
    color: 'red'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#3498db', // Custom button color
  },
});

export default HomeScreen;