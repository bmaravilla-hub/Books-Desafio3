import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BookListScreen from '../screens/BookListScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import AddEditBookScreen from '../screens/AddEditBookScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: true,
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Registro' }}
      />
      <Stack.Screen 
        name="BookList" 
        component={BookListScreen}
        options={{ title: 'Mis Libros' }}
      />
      <Stack.Screen 
        name="BookDetail" 
        component={BookDetailScreen}
        options={{ title: 'Detalles del Libro' }}
      />
      <Stack.Screen 
        name="AddBook" 
        component={AddEditBookScreen}
        options={{ title: 'Agregar Libro' }}
      />
      <Stack.Screen 
        name="EditBook" 
        component={AddEditBookScreen}
        options={{ title: 'Editar Libro' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;