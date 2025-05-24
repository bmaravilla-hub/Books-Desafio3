import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function FloatingActionButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.text}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
  },
});
