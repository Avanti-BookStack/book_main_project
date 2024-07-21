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
    return res.status(400).json({ 'error': 'User does not exist' });
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
    res.status(400).json({ 'error': error.message });
  }
};
