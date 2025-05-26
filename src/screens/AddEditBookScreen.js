import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { addBook, updateBook } from '../services/books';
import BookForm from '../components/BookForm';
import { colors } from '../theme/colors';

const AddEditBookScreen = ({ route, navigation }) => {
  const { bookId, initialData } = route.params || {};
  const [book, setBook] = useState(initialData || null);
  const [loading, setLoading] = useState(!!bookId);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;
      
      try {
        const docRef = doc(db, 'books', bookId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBook({
            title: data.title,
            author: data.author,
            status: data.status,
            startDate: data.startDate?.toDate(),
            endDate: data.endDate?.toDate(),
            comment: data.comment,
          });
        }
      } catch (error) {
        console.error("Error fetching book: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleSubmit = async (bookData) => {
    try {
      if (bookId) {
        await updateBook(bookId, bookData);
      } else {
        await addBook(bookData);
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error saving book: ", error);
      alert("Error al guardar el libro");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BookForm
        initialData={book}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddEditBookScreen;