import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BookList.module.css';
import Header from '../../components/Header/Header';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    category: ''
  });
  // Regra para validar o token
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:3000/books', {
          params: filters,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };

    fetchBooks();
  }, [filters]);

  // Filtragem com lógica de toLowerCase
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
    book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
    book.category.toLowerCase().includes(filters.category.toLowerCase())
  );

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <input 
          type="text"
          placeholder="Buscar por título"
          value={filters.title}
          onChange={(e) => handleFilterChange('title', e.target.value)}
        />
        <input 
          type="text"
          placeholder="Buscar por autor"
          value={filters.author}
          onChange={(e) => handleFilterChange('author', e.target.value)}
        />
        <input 
          type="text"
          placeholder="Buscar por categoria"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        />
        
        <div className={styles.bookList}>
          {filteredBooks.map((book) => (
            <div key={book.book_id} className={styles.bookItem}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.category}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookList;
