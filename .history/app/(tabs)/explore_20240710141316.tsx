import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Image,Alert ,TouchableOpacity,Text} from 'react-native';
import axios from 'axios';
const TabTwoScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const [names, setnames] = useState('');
  const [showNotification, setShowNotification] = useState(true);

  const handleDismiss = () => {
    setShowNotification(false);
  };
  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleEmailChange = (text) => {
    setemail(text);
  };
  const handleNamesChange = (text) => {
    setnames(text);
  };

  const handleSubmit = () => {
    const data = {
      username: username,
      email: email,
      password: password,
      names: names,
    };
  
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}, Names: ${names}`);
  
    // axios.post('https://2127-197-254-120-202.ngrok-free.app/register', data)
    //   .then(response => {
    //     console.log('Response:', response.data);
    //     // Handle successful response
    //   })
    //   .catch(error => {
    //     console.error('There was an error!', error);
    //     // Handle error
    //   });
  };

  return (
    <View style={styles.container}>
      
       <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
       {showNotification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>Welcome! Please register to get started and start Journaling</Text>
      
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        value={username}
      />
       <TextInput
        style={styles.input}
        placeholder="names"
        onChangeText={handleNamesChange}
        value={names}
        //secureTextEntry={true} // For password input
      />
        <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
        //secureTextEntry={true} // For password input
      />
         <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry={true} // For password input
      />
     
    <Button
        title="Register"
        onPress={handleSubmit}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    backgroundColor: '#e0f7fa',
    borderColor: '#b2ebf2',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  notificationText: {
    color: '#00796b',
    fontSize: 16,
    marginBottom: 10,
  },
  dismissButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
  },
  dismissButtonText: {
    color: '#fff',
    fontSize: 16,
  },
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

export default TabTwoScreen;