import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BookStatusIndicator from './BookStatusIndicator';
import { colors } from '../theme/colors';

const BookCard = ({ book, onPress }) => {
  const getStatusColor = () => {
    switch(book.status) {
      case 'leyendo': return colors.lavenderDark;
      case 'completado': return colors.success;
      case 'por leer': return colors.info;
      default: return colors.lavenderLight;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: getStatusColor() }]}
      onPress={onPress}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>
      <BookStatusIndicator status={book.status} />
      <MaterialIcons name="chevron-right" size={24} color={colors.lavenderDark} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderLeftWidth: 5,
    shadowColor: colors.lavenderDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  author: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default BookCard;