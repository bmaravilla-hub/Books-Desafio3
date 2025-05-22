import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const LoginForm = ({ onSubmit, navigation, loading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSubmit = () => {
    onSubmit(email, password);
  };

  return (
    <View style={styles.container}>
      <MaterialIcons 
        name="menu-book" 
        size={80} 
        color={colors.primary} 
        style={styles.icon} 
      />
      
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        mode="outlined"
        left={<TextInput.Icon name="email" />}
      />
      
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        mode="outlined"
        left={<TextInput.Icon name="lock" />}
        right={
          <TextInput.Icon 
            name={secureTextEntry ? "eye-off" : "eye"} 
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
      />
      
      <Button 
        mode="contained" 
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </Button>
      
      <TouchableOpacity 
        style={styles.linkContainer} 
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.linkText}>
          ¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  buttonLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  linkBold: {
    fontWeight: 'bold',
    color: colors.primary,
  },
});

export default LoginForm;