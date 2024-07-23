import prisma from '../database/prismaClient.js';

// POST para criar um registro na tabela requests
export const createRequest = async (req, res) => {
  const {
    books_id,
    user_id,
    request_number,
    delivery_zip,
    delivery_address,
    delivery_number,
    delivery_neighborhood,
    delivery_city,
    delivery_state,
    request_date,
    offered_book_id,
    requested_book_id
  } = req.body;

  if (!books_id || !user_id) {
    return res.status(400).json({ 'error': 'books_id and user_id are required' });
  }

  try {
    // Verifica se o book_id e user_id existem
    const bookExists = await prisma.books.findUnique({ where: { book_id: books_id } });
    const userExists = await prisma.users.findUnique({ where: { user_id } });

    if (!bookExists || !userExists) {
      return res.status(404).json({ 'error': 'Book or User not found' });
    }

    // Criar novo request
    const newRequest = await prisma.requests.create({
      data: {
        books_id,
        user_id,
        request_number,
        delivery_zip,
        delivery_address,
        delivery_number,
        delivery_neighborhood,
        delivery_city,
        delivery_state,
        request_date: new Date(request_date),
        offered_book_id,
        requested_book_id,
        status_id: 1 // Certifique-se que o status_id 1 existe na tabela request_history
      },
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ 'error': error.message });
  }
};
