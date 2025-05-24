import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import BookStatusIndicator from './BookStatusIndicator';

export default function BookCard({ book, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>{book.title}</Text>
        <BookStatusIndicator status={book.status} />
      </View>
      <Text style={styles.author}>{book.author}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  author: {
    color: '#555',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
