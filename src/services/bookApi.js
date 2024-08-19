import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Rota GET para buscar todos os livros no banco de dados
export const getBooksByFilters = async (filters) => {
  const response = await api.get('/books', { params: filters });
  return response.data;
};

/* Rota POST para criar um novo livro

  Código aqui!

*/

/* Rota PUT para atualizar um livro existente */
export const updateBook = async (bookId, updatedData) => {
  const response = await api.put(`/books/${bookId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

/* Rota DELETE para remover um livro

  Código aqui!

*/
