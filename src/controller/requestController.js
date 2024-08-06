import prisma from '../database/prismaClient.js';

// Função para criar uma nova solicitação (request) e inserir no histórico (request_history)
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

  try {
    // Validação para garantir que o livro e o usuário existem nas tabelas correspondentes
    const bookExists = await prisma.books.findUnique({
      where: { book_id: books_id }
    });

    const userExists = await prisma.users.findUnique({
      where: { user_id }
    });

    if (!bookExists || !userExists) {
      return res.status(404).json({ 'error': 'Book or User not found' });
    }

    // Criação da nova solicitação (request)
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
        request_date,
        offered_book_id,
        requested_book_id
      },
    });

    // Inserção do novo status no histórico (request_history)
    const newRequestHistory = await prisma.request_history.create({
      data: {
        request_id: newRequest.request_id,
        previous_status: 'Created',
        current_status: 'Created',
        change_date: new Date()
      },
    });

    res.status(201).json({ newRequest, newRequestHistory });
  } catch (error) {
    res.status(404).json({ 'error': error.message });
  }
};

export const getAllRequests = async (req, res) => { /*Retorna todos os Request criados. 
  Além disso, pelo que vi, retorna user e book que está relacionada com request*/
  try {
    const requests = await prisma.requests.findMany({
      include: {
        users: true,
        books: true,
        request_history_request_history_request_idTorequests: true,
      }
    })
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ 'error': error.message });
  }
};


export const updateRequest = async (req, res) => {
  const { id } = req.params;
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
    const updatedRequest = await prisma.requests.update({
      where: { request_id: parseInt(id) },
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
        request_date,
        offered_book_id,
        requested_book_id
      }
    });

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(404).json({ 'error': error.message });
  }
};