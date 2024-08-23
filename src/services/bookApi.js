import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Rota GET para buscar todos os livros no banco de dados
export const getBooksByFilters = async (filters) => {
  const response = await api.get('/books', { params: filters });
  return response.data;
};

/* Rota POST para criar um novo livro*/
export const createBook = async (newBook) => {
  const response = await api.post('/books', newBook, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};


/* Rota PUT para atualizar um livro existente */
export const updateBook = async (bookId, updatedData) => {
  const response = await api.put(`/books/${bookId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

/* Rota DELETE para remover um livro */
export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar o livro:', error);
    throw error;
  }
};