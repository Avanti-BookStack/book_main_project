import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import styles from './BookList.module.css';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import { LoginContext } from '../../context/AuthContext'; 
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    category: ''
  });

  const { userId, token, isLoading, loadUserData } = useContext(LoginContext);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  const fetchBooks = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get('http://localhost:3000/books', {
        params: filters,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  }, [filters, token]);

  useEffect(() => {
    if (!isLoading) {
      fetchBooks();
    }
  }, [fetchBooks, isLoading]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const filteredBooks = books.filter((book) =>
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

  const handleEditBook = (book) => {
    setEditingBookId(book.book_id);
    setEditedBook(book);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:3000/books/${editedBook.book_id}`, editedBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingBookId(null);
      fetchBooks();
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja deletar este livro?");
  
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove o livro deletado da lista sem recarregar todos os livros
      setBooks(books.filter(book => book.book_id !== id));
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };
  console.log(books)


  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      {books.length ? 
        <div className={styles.container}>
        <div className={styles.container_inputs}>
          <input 
            type="text"
            placeholder="Buscar por título"
            value={filters.title}
            onChange={(e) => handleFilterChange('title', e.target.value)}
            className={styles.input}
          /> 
          <input 
            type="text"
            placeholder="Buscar por autor"
            value={filters.author}
            onChange={(e) => handleFilterChange('author', e.target.value)}
            className={styles.input}
          />
          <input 
            type="text"
            placeholder="Buscar por categoria"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className={styles.input}
          />
        </div>
        
        <div className={styles.bookList}>
          {filteredBooks.map((book) => (
            <div key={book.book_id} className={styles.bookItem}>
              {editingBookId === book.book_id ? (
                <>
                  <input 
                    type="text"
                    name="title"
                    value={editedBook.title}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  <input 
                    type="text"
                    name="author"
                    value={editedBook.author}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  <input 
                    type="text"
                    name="category"
                    value={editedBook.category}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  <textarea
                    name="description"
                    value={editedBook.description}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                  <Button label="Salvar" onClick={handleSaveChanges} />
                </>
              ) : (
                <>
                  <Title level="3">{book.title}</Title>
                  <div>
                    <p className={styles.info}>
                      Autor: <span className={styles.subInfor}>{book.author}</span>
                    </p>
                    <p className={styles.info}>
                      Categoria: <span className={styles.subInfor}>{book.category}</span>
                    </p>
                    <p className={styles.info}>
                      Descrição: <span className={styles.subInfor}>{book.description}</span>
                    </p>
                    {userId && userId === book.user_id.toString() && (
                      <>
                      <Button label="Modificar" onClick={() => handleEditBook(book)} />
                      <Button className="delete-button" label="Deletar"onClick={() => handleDeleteBook(book.book_id)} additionalClass="red"/>  
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      :
      <div className={styles.containerNoBooks}>
        <h1>Faça <Link to="/login">login</Link> para ter acesso aos livros!</h1>
      </div>
      } 
    </>
  );
};

export default BookList;
