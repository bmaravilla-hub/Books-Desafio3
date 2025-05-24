import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function BookDetailScreen({ route }) {
  const { book } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>{book.title}</Text>

      <Text style={styles.label}>Autor:</Text>
      <Text style={styles.value}>{book.author}</Text>

      <Text style={styles.label}>Estado:</Text>
      <Text style={styles.value}>{book.status}</Text>

      {book.startDate ? (
        <>
          <Text style={styles.label}>Fecha de inicio:</Text>
          <Text style={styles.value}>{book.startDate}</Text>
        </>
      ) : null}

      {book.endDate ? (
        <>
          <Text style={styles.label}>Fecha de fin:</Text>
          <Text style={styles.value}>{book.endDate}</Text>
        </>
      ) : null}

      {book.comment ? (
        <>
          <Text style={styles.label}>Comentario:</Text>
          <Text style={styles.value}>{book.comment}</Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E0854',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F3E5F5',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#CE93D8',
    marginTop: 15,
  },
  value: {
    fontSize: 16,
    color: '#E1BEE7',
    marginTop: 5,
  },
});
