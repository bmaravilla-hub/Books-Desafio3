import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { BooksProvider } from './src/context/BooksContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import BookListScreen from './src/screens/BookListScreen';
import AddEditBookScreen from './src/screens/AddEditBookScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {({ user }) => (
              <Stack.Navigator>
                {user ? (
                  <>
                    <Stack.Screen
                      name="BookList"
                      component={BookListScreen}
                      options={{ title: 'Mis Libros' }}
                    />
                    <Stack.Screen
                      name="AddEditBook"
                      component={AddEditBookScreen}
                      options={({ route }) => ({
                        title: route.params?.add ? 'Agregar Libro' : 'Editar Libro',
                      })}
                    />
                    <Stack.Screen
                      name="BookDetail"
                      component={BookDetailScreen}
                      options={{ title: 'Detalle del Libro' }}
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Stack.Navigator>
            )}
          </AuthContext.Consumer>
        </NavigationContainer>
      </BooksProvider>
    </AuthProvider>
  );
}
