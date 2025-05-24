import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';

export default function RegisterForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ccc"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#ccc"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <View style={styles.buttonContainer}>
        <Button
          color="#7B2FF7"
          title="Registrarse"
          onPress={() => onSubmit(email.trim(), password, confirmPassword)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#2E0854',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#4B2570',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 10,
  },
});
