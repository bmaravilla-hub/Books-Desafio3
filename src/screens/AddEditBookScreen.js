import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView, Platform, } from 'react-native';
import { BooksContext } from '../context/BooksContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const estados = ['Por leer', 'Leyendo', 'Completado'];

export default function AddEditBookScreen({ navigation, route }) {
  const { add, book } = route.params;
  const { addBook, editBook } = useContext(BooksContext);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState(estados[0]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [comment, setComment] = useState('');

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    if (!add && book) {
      setTitle(book.title);
      setAuthor(book.author);
      setStatus(book.status || estados[0]);
      setStartDate(book.startDate ? new Date(book.startDate) : null);
      setEndDate(book.endDate ? new Date(book.endDate) : null);
      setComment(book.comment || '');
    }
  }, [add, book]);

  const onSave = () => {
    if (!title.trim() || !author.trim()) {
      Alert.alert('Error', 'Por favor completa los campos de título y autor.');
      return;
    }

    if (startDate && endDate && endDate < startDate) {
      Alert.alert('Error', 'La fecha de fin no puede ser anterior a la fecha de inicio.');
      return;
    }

    const newBook = {
      id: add ? Date.now().toString() : book.id,
      title,
      author,
      status,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
      comment,
    };

    if (add) {
      addBook(newBook);
    } else {
      editBook(newBook);
    }

    navigation.goBack();
  };

  const onChangeStart = (event, selectedDate) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) setStartDate(selectedDate);
  };

  const onChangeEnd = (event, selectedDate) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) setEndDate(selectedDate);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Título del libro"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Autor:</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Nombre del autor"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Estado:</Text>
      <View style={styles.statusContainer}>
        {estados.map((est) => (
          <TouchableOpacity
            key={est}
            style={[
              styles.statusOption,
              est === status && styles.statusOptionSelected,
            ]}
            onPress={() => setStatus(est)}
          >
            <Text
              style={[
                styles.statusOptionText,
                est === status && styles.statusOptionTextSelected,
              ]}
            >
              {est}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Fecha de inicio (opcional):</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowStartPicker(true)}
      >
        <Text style={styles.datePickerText}>
          {startDate ? startDate.toLocaleDateString() : 'Seleccionar fecha'}
        </Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeStart}
          maximumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Fecha de fin (opcional):</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowEndPicker(true)}
      >
        <Text style={styles.datePickerText}>
          {endDate ? endDate.toLocaleDateString() : 'Seleccionar fecha'}
        </Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeEnd}
        />
      )}

      <Text style={styles.label}>Comentario (opcional):</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={setComment}
        placeholder="Escribe un comentario..."
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>{add ? 'Agregar' : 'Guardar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E0854',
    padding: 20,
  },
  label: {
    color: '#E1BEE7',
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderColor: '#CE93D8',
    borderWidth: 1,
    borderRadius: 8,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusOption: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#7B1FA2',
    alignItems: 'center',
  },
  statusOptionSelected: {
    backgroundColor: '#A64AC9',
  },
  statusOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statusOptionTextSelected: {
    color: '#FFF59D',
  },
  datePickerButton: {
    backgroundColor: '#7B1FA2',
    marginTop: 10,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  datePickerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: '#A64AC9',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
