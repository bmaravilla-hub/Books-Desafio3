import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function BookStatusIndicator({ status }) {
  let backgroundColor = '#ccc';
  if (status === 'leyendo') backgroundColor = 'orange';
  else if (status === 'completado') backgroundColor = 'green';
  else if (status === 'por leer') backgroundColor = 'gray';

  return <View style={[styles.indicator, { backgroundColor }]} />;
}

const styles = StyleSheet.create({
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
});
