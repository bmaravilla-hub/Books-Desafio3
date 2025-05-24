import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../theme/colors';

const BookForm = ({ initialData, onSubmit, onCancel }) => {
  const [book, setBook] = useState(initialData || {
    title: '',
    author: '',
    status: 'por leer',
    startDate: null,
    endDate: null,
    comment: ''
  });
  
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!book.title.trim()) newErrors.title = 'Título es requerido';
    if (!book.author.trim()) newErrors.author = 'Autor es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(book);
    }
  };

  const handleDateChange = (selectedDate, type) => {
    if (type === 'start') {
      setShowStartDatePicker(false);
      if (selectedDate) {
        setBook({ ...book, startDate: selectedDate });
      }
    } else {
      setShowEndDatePicker(false);
      if (selectedDate) {
        setBook({ ...book, endDate: selectedDate });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título *</Text>
      <TextInput
        style={[styles.input, errors.title && styles.errorInput]}
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
        placeholder="Título del libro"
        placeholderTextColor="#999"
      />
      {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

      <Text style={styles.label}>Autor *</Text>
      <TextInput
        style={[styles.input, errors.author && styles.errorInput]}
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
        placeholder="Autor del libro"
        placeholderTextColor="#999"
      />
      {errors.author && <Text style={styles.errorText}>{errors.author}</Text>}

      <Text style={styles.label}>Estado</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={book.status}
          onValueChange={(itemValue) => setBook({ ...book, status: itemValue })}
          style={styles.picker}
          dropdownIconColor={colors.primary}
        >
          <Picker.Item label="Por leer" value="por leer" />
          <Picker.Item label="Leyendo" value="leyendo" />
          <Picker.Item label="Completado" value="completado" />
        </Picker>
      </View>

      <Text style={styles.label}>Fecha de inicio</Text>
      <TouchableOpacity 
        style={styles.dateInput}
        onPress={() => setShowStartDatePicker(true)}
      >
        <Text style={book.startDate ? styles.dateText : styles.placeholderText}>
          {book.startDate ? book.startDate.toLocaleDateString() : 'Seleccionar fecha'}
        </Text>
        <MaterialIcons name="calendar-today" size={20} color={colors.lavenderDark} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showStartDatePicker}
        mode="date"
        date={book.startDate || new Date()}
        onConfirm={(date) => handleDateChange(date, 'start')}
        onCancel={() => setShowStartDatePicker(false)}
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        headerTextIOS="Selecciona fecha de inicio"
      />

      {book.status === 'completado' && (
        <>
          <Text style={styles.label}>Fecha de finalización</Text>
          <TouchableOpacity 
            style={styles.dateInput}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text style={book.endDate ? styles.dateText : styles.placeholderText}>
              {book.endDate ? book.endDate.toLocaleDateString() : 'Seleccionar fecha'}
            </Text>
            <MaterialIcons name="calendar-today" size={20} color={colors.lavenderDark} />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={showEndDatePicker}
            mode="date"
            date={book.endDate || new Date()}
            onConfirm={(date) => handleDateChange(date, 'end')}
            onCancel={() => setShowEndDatePicker(false)}
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            headerTextIOS="Selecciona fecha de finalización"
          />
        </>
      )}

      <Text style={styles.label}>Comentario</Text>
      <TextInput
        style={[styles.input, styles.commentInput]}
        value={book.comment}
        onChangeText={(text) => setBook({ ...book, comment: text })}
        placeholder="Tus notas sobre este libro..."
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 10,
  },
  label: {
    fontSize: 14,
    color: colors.lavenderDark,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lavenderLight,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.textPrimary,
  },
  commentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: -10,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.lavenderLight,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: colors.textPrimary,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lavenderLight,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  dateText: {
    color: colors.textPrimary,
  },
  placeholderText: {
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.lavenderLight,
    padding: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.lavenderDark,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.lavenderDark,
    fontWeight: '600',
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});

export default BookForm;