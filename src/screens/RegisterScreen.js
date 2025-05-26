import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { registerUser } from '../services/auth';
import RegisterForm from '../components/RegisterForm';
import { colors } from '../theme/colors';

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (email, password) => {
    setLoading(true);
    const result = await registerUser(email, password);
    console.log('Registro result:', result);  
    setLoading(false);

    if (result.success) {
      Alert.alert('Éxito', 'Registro exitoso. Redirigiendo...');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <RegisterForm 
        onSubmit={handleRegister} 
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

export default RegisterScreen;