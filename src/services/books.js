import { db } from '../utils/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '../utils/firebase';

export const addBook = async (bookData) => {
  try {
    const bookWithUser = {
      ...bookData,
      userId: auth.currentUser.uid,
      createdAt: new Date(),
    };
    
    const docRef = await addDoc(collection(db, 'books'), bookWithUser);
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: 'Error al agregar libro' };
  }
};

export const updateBook = async (bookId, bookData) => {
  try {
    await updateDoc(doc(db, 'books', bookId), bookData);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al actualizar libro' };
  }
};

export const deleteBook = async (bookId) => {
  try {
    await deleteDoc(doc(db, 'books', bookId));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Error al eliminar libro' };
  }
};