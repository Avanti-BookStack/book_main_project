import prisma from '../database/prismaClient.js';

export const createRating = async (req, res) => {
  const {
    user_id,
    request_id,
    creation_date,
    comment,
    stars
  } = req.body;

  // Validação para garantir que user_id e request_id existem nas tabelas users e requests
  const userExists = await prisma.users.findUnique({
    where: { user_id }
  });

  const requestExists = await prisma.requests.findUnique({
    where: { request_id }
  });

  if (!userExists) {
    return res.status(404).json({ 'error': 'User not found' });
  }

  if (!requestExists) {
    return res.status(404).json({ 'error': 'Request not found' });
  }

  try {
    const newRating = await prisma.ratings.create({
      data: {
        user_id,
        request_id,
        creation_date,
        comment,
        stars
      },
    });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(404).json({ 'error': error.message });
  }
};
