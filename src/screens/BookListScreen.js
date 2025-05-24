import React, { useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet, } from 'react-native';
import { BooksContext } from '../context/BooksContext';
import { AuthContext } from '../context/AuthContext';

export default function BookListScreen({ navigation }) {
  const { books, deleteBook } = useContext(BooksContext);
  const { logout } = useContext(AuthContext);

  const onDelete = (id) => {
    Alert.alert(
      'Eliminar libro',
      '¿Estás seguro que quieres eliminar este libro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => deleteBook(id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => logout()} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('BookDetail', { book: item })}
            style={styles.bookItem}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.status}>Estado: {item.status}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onDelete(item.id)}
              >
                <Text style={styles.actionText}>Eliminar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() =>
                  navigation.navigate('AddEditBook', { add: false, book: item })
                }
              >
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddEditBook', { add: true })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E0854',
    padding: 10,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#A64AC9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bookItem: {
    backgroundColor: '#F3E5F5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4A0072',
  },
  author: {
    fontSize: 14,
    color: '#333',
  },
  status: {
    marginTop: 5,
    fontStyle: 'italic',
    color: '#6A1B9A',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#BA68C8',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#CE93D8',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#7B1FA2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 32,
    color: 'white',
  },
});
