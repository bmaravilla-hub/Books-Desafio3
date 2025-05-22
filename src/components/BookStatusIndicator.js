import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const BookStatusIndicator = ({ status }) => {
  const getStatusColor = () => {
    switch(status) {
      case 'leyendo': return colors.lavenderDark;
      case 'completado': return colors.success;
      case 'por leer': return colors.info;
      default: return colors.lavenderLight;
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 'leyendo': return 'Leyendo';
      case 'completado': return 'Completado';
      case 'por leer': return 'Por leer';
      default: return '';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: getStatusColor() }]}>
      <Text style={styles.text}>{getStatusText()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BookStatusIndicator;