import React, { createContext, useState, useEffect } from 'react';
const booksData = require('../../assets/books.json');

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(booksData);
  }, []);

  const addBook = (book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
  };

  const editBook = (book) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === book.id ? book : b))
    );
  };

  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((b) => b.id !== id));
  };

  return (
    <BooksContext.Provider value={{ books, addBook, editBook, deleteBook }}>
      {children}
    </BooksContext.Provider>
  );
}
