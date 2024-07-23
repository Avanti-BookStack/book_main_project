import prisma from '../database/prismaClient.js';

// POST para criar um registro na tabela requests
export const createRequest = async (req, res) => {
  const {
    books_id,
    user_id,
    status_id,
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

  try {
    // Criar nova solicitação
    const newRequest = await prisma.requests.create({
      data: {
        books_id,
        user_id,
        status_id,
        request_number,
        delivery_zip,
        delivery_address,
        delivery_number,
        delivery_neighborhood,
        delivery_city,
        delivery_state,
        request_date: new Date(request_date),
        offered_book_id,
        requested_book_id
      },
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ 'error': error.message });
  }
};
