import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../services/auth';
import LoginForm from '../components/LoginForm';
import { colors } from '../theme/colors';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Error', result.error);
    } else {
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
    }
  };

  return (
    <View style={styles.container}>
      <LoginForm
        onSubmit={handleLogin}
        navigation={navigation}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});

export default LoginScreen;