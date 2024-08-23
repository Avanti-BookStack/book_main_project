import { useState, useContext } from 'react';
import { createBook,deleteBook, getBooksByFilters } from '../../services/bookApi';
import { LoginContext } from '../../context/AuthContext';
import TextInput from '../../components/TextInput/TextInput';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import BookCard from '../../components/BookCard/BookCard';
import styles from './BookRegister.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const BookRegister = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [availableNow, setAvailableNow] = useState(false);
  const [registrationDate, setRegistrationDate] = useState('');
  const [books, setBooks] = useState([]);
  
  const { userId } = useContext(LoginContext); 
  const navigate = useNavigate();

  // Recuperar livros do localStorage ao carregar o componente
  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await getBooksByFilters({}); // Se houver filtros, você pode adicioná-los aqui
      setBooks(fetchedBooks);
      localStorage.setItem('books', JSON.stringify(fetchedBooks));
    };

    fetchBooks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

     // Verificação do token
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para cadastrar um livro.');
      return;
    }
      
    const newBook = {
      user_id: Number(userId), 
      title,
      category,
      author,
      publisher,
      publication_year: Number(publicationYear),
      description,
      cover_image: coverImage,
      available_now: availableNow ? 'Ok' : 'No',
      registration_date: new Date(registrationDate),
    };
    
    try {
      await createBook(newBook);  
      alert('Livro cadastrado com sucesso!');
      setBooks([...books, newBook]); // Adiciona o novo livro ao estado dos livros

      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);

      // Salvar livros atualizados no localStorage
      localStorage.setItem('books', JSON.stringify(updatedBooks));
      navigate('/buscar-livros');
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('Você não tem permissão para realizar esta ação. Faça login novamente.');
      } else {
        console.error(error);
        alert('Erro ao cadastrar o livro.');
      }
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteBook(bookId);
      alert('Livro excluído com sucesso!');
      const updatedBooks = books.filter(book => book.id !== bookId);
      setBooks(updatedBooks);
      localStorage.setItem('books', JSON.stringify(updatedBooks));
    } catch (error) {
      console.error('Erro ao excluir o livro:', error);
      alert('Erro ao excluir o livro.');
    }
  };


  return (
    <>
        <Header />
        <div className={styles.container}>
        <Title level={2}>Cadastro de Livro</Title>
        <form onSubmit={handleSubmit} className={styles.form}>
            <TextInput
            label="Título"
            inputValue={title}
            setInputValue={setTitle}
            placeholder="Digite o título do livro"
            required={true}
            htmlFor="title"
            type="text"
            />
            <TextInput
            label="Categoria"
            inputValue={category}
            setInputValue={setCategory}
            placeholder="Digite a categoria do livro"
            required={true}
            htmlFor="category"
            type="text"
            />
            <TextInput
            label="Autor"
            inputValue={author}
            setInputValue={setAuthor}
            placeholder="Digite o nome do autor"
            required={true}
            htmlFor="author"
            type="text"
            />
            <TextInput
            label="Editora"
            inputValue={publisher}
            setInputValue={setPublisher}
            placeholder="Digite o nome da editora"
            required={true}
            htmlFor="publisher"
            type="text"
            />
            <TextInput
            label="Ano de Publicação"
            inputValue={publicationYear}
            setInputValue={setPublicationYear}
            placeholder="Digite o ano de publicação"
            required={true}
            htmlFor="publicationYear"
            type="number"
            />
            <TextInput
            label="Descrição"
            inputValue={description}
            setInputValue={setDescription}
            placeholder="Digite uma descrição para o livro"
            required={true}
            htmlFor="description"
            type="text"
            />
            <TextInput
            label="URL da Imagem de Capa"
            inputValue={coverImage}
            setInputValue={setCoverImage}
            placeholder="Digite a URL da imagem de capa"
            required={true}
            htmlFor="coverImage"
            type="text"
            />
            <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel} htmlFor="availableNow">Disponível Agora:</label>
            <input
                id="availableNow"
                type="checkbox"
                checked={availableNow}
                onChange={(e) => setAvailableNow(e.target.checked)}
            />
            </div>
            <TextInput
            label="Data de Registro"
            inputValue={registrationDate}
            setInputValue={setRegistrationDate}
            placeholder="Digite a data de registro"
            required={true}
            htmlFor="registrationDate"
            type="date"
            />
            <Button label="Cadastrar Livro" type="submit" />
        </form>
        
        </div>
         {/* Renderiza os BookCards */}
         <div className={styles.bookList}>
          {books.map((book, index) => (
            <BookCard
              key={index}
              title={book.title}
              category={book.category}
              author={book.author}
              publisher={book.publisher}
              publicationYear={book.publication_year}
              description={book.description}
              coverImage={book.cover_image}
              availableNow={book.available_now === 'Ok'}
              registrationDate={book.registration_date}
              onDelete={() => handleDelete(book.id)}
              
            />
          ))}
        </div>
    </>
  );
};

export default BookRegister;
