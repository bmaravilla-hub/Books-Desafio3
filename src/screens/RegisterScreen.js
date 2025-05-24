import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);

  const handleRegister = (email, password, confirmPassword) => {
    const success = register(email, password, confirmPassword);
    if (success) {
    }
  };

  return (
    <View style={styles.container}>
      <RegisterForm onSubmit={handleRegister} />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2E0854', justifyContent: 'center', padding: 20 },
  loginText: { color: '#fff', marginTop: 15, textAlign: 'center', textDecorationLine: 'underline' },
});
