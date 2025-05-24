import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLoggedInUser } from './auth';

export async function getBooks() {
  const user = await getLoggedInUser();
  if (!user) return [];

  const booksJson = await AsyncStorage.getItem(`books_${user.email}`);
  return booksJson ? JSON.parse(booksJson) : [];
}

export async function saveBook(book) {
  const user = await getLoggedInUser();
  if (!user) throw new Error('Usuario no autenticado');

  const books = await getBooks();

  if (book.id) {
    const index = books.findIndex(b => b.id === book.id);
    if (index !== -1) books[index] = book;
  } else {
    book.id = Date.now().toString();
    books.push(book);
  }

  await AsyncStorage.setItem(`books_${user.email}`, JSON.stringify(books));
}

export async function deleteBook(id) {
  const user = await getLoggedInUser();
  if (!user) throw new Error('Usuario no autenticado');

  let books = await getBooks();
  books = books.filter(b => b.id !== id);

  await AsyncStorage.setItem(`books_${user.email}`, JSON.stringify(books));
}
