import prisma from '../database/prismaClient.js';

export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.books.findMany();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ 'error': error.message });
  }
};

export const createBook = async (req, res) => {
  const {
    user_id,
    title,
    category,
    author,
    publisher,
    publication_year,
    description,
    cover_image,
    available_now,
    registration_date
  } = req.body;

  // Validação para garantir que user_id existe na tabela users
  const userExists = await prisma.users.findUnique({
    where: { user_id }
  });

  if (!userExists) {
    return res.status(404).json({ 'error': 'User does not exist' });
  }

  try {
    const newBook = await prisma.books.create({
      data: {
        user_id,
        title,
        category,
        author,
        publisher,
        publication_year,
        description,
        cover_image,
        available_now,
        registration_date
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(404).json({ 'error': error.message });
  }
};

export const putBooks = async (req, res) => {
  const { title, category, author, publisher, publication_year, description, cover_image, available_now, registration_date } = req.body;
  const { id } = req.params;

  try {
      const bookDataBase = await prisma.books.update({
          where: { book_id: parseInt(id) },
          data: {
              title,
              category,
              author,
              publisher,
              publication_year,
              description,
              cover_image,
              available_now,
              registration_date
          }
      });

      res.status(200).json(bookDataBase);
  } catch (error) {
      res.status(404).json({ 'error': error.message });
  }
};

export const deleteBooks = async (req, res) => {
const { id } = req.params;

try {
    const bookDataBase = await prisma.books.delete({
        where: { book_id: parseInt(id) }
    });
    res.status(204).send("Livro deletado com Sucesso!");
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar Livro.' });
  }
}

//Filtrar Livros por Titulo - Passar o titulo como parametro, mas sem ser em formato de String
export const getBooksByTitle = async (req, res) => {
  const { title } = req.params;

  try {
    const books = await prisma.books.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive'
        }
      }
    });

    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ 'error': error.message });
  }
};