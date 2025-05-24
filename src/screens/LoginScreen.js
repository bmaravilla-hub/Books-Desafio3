import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const handleLogin = (email, password) => {
    const success = login(email, password);
    if (!success) return;
  };

  return (
    <View style={styles.container}>
      <LoginForm onSubmit={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2E0854', justifyContent: 'center', padding: 20 },
  registerText: { color: '#fff', marginTop: 15, textAlign: 'center', textDecorationLine: 'underline' },
});
