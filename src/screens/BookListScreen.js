import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { auth, db } from '../utils/firebase';
import { signOut } from 'firebase/auth'; 
import BookCard from '../components/BookCard';
import FloatingActionButton from '../components/FloatingActionButton';
import { colors } from '../theme/colors';

const BookListScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'books'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const booksData = [];
      querySnapshot.forEach((doc) => {
        booksData.push({ id: doc.id, ...doc.data() });
      });
      setBooks(booksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color={colors.lavenderDark} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo de nuevo.');
            }
          },
        },
      ]
    );
  };

  const filteredBooks = filter === 'todos' 
    ? books 
    : books.filter(book => book.status === filter);

  const renderBookItem = ({ item }) => (
    <BookCard 
      book={item} 
      onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Biblioteca</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'todos' && styles.activeFilter]}
            onPress={() => setFilter('todos')}
          >
            <Text style={[styles.filterText, filter === 'todos' && styles.activeFilterText]}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'por leer' && styles.activeFilter]}
            onPress={() => setFilter('por leer')}
          >
            <Text style={[styles.filterText, filter === 'por leer' && styles.activeFilterText]}>Por leer</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'leyendo' && styles.activeFilter]}
            onPress={() => setFilter('leyendo')}
          >
            <Text style={[styles.filterText, filter === 'leyendo' && styles.activeFilterText]}>Leyendo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'completado' && styles.activeFilter]}
            onPress={() => setFilter('completado')}
          >
            <Text style={[styles.filterText, filter === 'completado' && styles.activeFilterText]}>Completados</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.lavenderDark} />
        </View>
      ) : filteredBooks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="menu-book" size={60} color={colors.lavenderLight} />
          <Text style={styles.emptyText}>No hay libros en esta categoría</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FloatingActionButton 
        onPress={() => navigation.navigate('AddBook')}
        icon="add"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lavenderLight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.lavenderDark,
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.lavenderLight,
  },
  activeFilter: {
    backgroundColor: colors.lavenderDark,
    borderColor: colors.lavenderDark,
  },
  filterText: {
    fontSize: 12,
    color: colors.lavenderDark,
  },
  activeFilterText: {
    color: colors.white,
  },
  listContent: {
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginRight: 15,
  },
});

export default BookListScreen;