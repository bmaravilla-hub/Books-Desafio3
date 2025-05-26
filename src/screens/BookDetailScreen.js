import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { deleteBook } from '../services/books';
import { colors } from '../theme/colors';

const BookDetailScreen = ({ route, navigation }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, 'books', bookId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBook({
            id: docSnap.id,
            title: data.title,
            author: data.author,
            status: data.status,
            startDate: data.startDate?.toDate(),
            endDate: data.endDate?.toDate(),
            comment: data.comment,
            createdAt: data.createdAt?.toDate(),
          });
        } else {
          Alert.alert('Error', 'El libro no fue encontrado');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el libro');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Libro',
      '¿Estás seguro de que quieres eliminar este libro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            const result = await deleteBook(book.id);
            if (result.success) {
              navigation.goBack();
            } else {
              Alert.alert('Error', result.error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditBook', { 
      bookId: book.id,
      initialData: {
        title: book.title,
        author: book.author,
        status: book.status,
        startDate: book.startDate,
        endDate: book.endDate,
        comment: book.comment,
      }
    });
  };

  if (loading || !book) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <MaterialIcons name="bookmark" size={24} color={colors.primary} />
          <Text style={styles.detailText}>Estado: {book.status}</Text>
        </View>
        
        {book.startDate && (
          <View style={styles.detailRow}>
            <MaterialIcons name="calendar-today" size={24} color={colors.primary} />
            <Text style={styles.detailText}>
              Inicio: {book.startDate.toLocaleDateString()}
            </Text>
          </View>
        )}
        
        {book.endDate && (
          <View style={styles.detailRow}>
            <MaterialIcons name="event-available" size={24} color={colors.primary} />
            <Text style={styles.detailText}>
              Finalización: {book.endDate.toLocaleDateString()}
            </Text>
          </View>
        )}
        
        {book.comment && (
          <View style={styles.commentContainer}>
            <Text style={styles.commentLabel}>Mis notas:</Text>
            <Text style={styles.commentText}>{book.comment}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <MaterialIcons name="edit" size={24} color={colors.white} />
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <MaterialIcons name="delete" size={24} color={colors.white} />
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  author: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: colors.textPrimary,
  },
  commentContainer: {
    marginTop: 20,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.error,
    padding: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default BookDetailScreen;