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

/* Rota PUT para atualizar um livro existente

  Código aqui!

*/

/* Rota DELETE para remover um livro

  Código aqui!

*/
