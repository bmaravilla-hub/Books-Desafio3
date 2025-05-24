import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BookListScreen from '../screens/BookListScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import AddEditBookScreen from '../screens/AddEditBookScreen';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="BookList" component={BookListScreen} options={{ title: 'Mis Libros' }} />
    <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: 'Detalle Libro' }} />
    <Stack.Screen name="AddEditBook" component={AddEditBookScreen} options={{ title: 'Agregar / Editar Libro' }} />
  </Stack.Navigator>
);

export default { AuthStack, MainStack };
