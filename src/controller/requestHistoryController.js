import prisma from '../database/prismaClient.js';

// POST para criar um registro na tabela request_history
export const createRequestHistory = async (req, res) => {
  const {
    request_id,
    previous_status,
    current_status,
    change_date
  } = req.body;

  try {
    // Criar novo status inicial
    const newRequestHistory = await prisma.request_history.create({
      data: {
        request_id,
        previous_status,
        current_status,
        change_date: new Date(change_date),
      },
    });

    res.status(201).json(newRequestHistory);
  } catch (error) {
    res.status(400).json({ 'error': error.message });
  }
};
