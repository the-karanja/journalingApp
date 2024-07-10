import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,Image,Alert } from 'react-native';

const TabTwoScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    setPassword(text);
  };

  const handleSubmit = () => {
    console.log(`Username: ${username}, Password: ${password}`);
    // Add your authentication logic here
  };

  return (
    <View style={styles.container}>
      
       <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
       {showNotification && (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>Welcome! Please register to get started.</Text>
          <TouchableOpacity onPress={handleDismiss} style={styles.dismissButton}>
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
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
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={password}
        secureTextEntry={true} // For password input
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
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