import prisma from '../database/prismaClient.js';

export const createUser = async (req, res) => {
  const {
    email,
    password,
    name,
    zip_code,
    address,
    number,
    neighborhood,
    city,
    state,
    birth_date,
    registration_date,
    positive_ratings,
    negative_ratings,
    blocked,
    admin
  } = req.body;

  try {
    const newUser = await prisma.users.create({
      data: {
        email,
        password,
        name,
        zip_code,
        address,
        number,
        neighborhood,
        city,
        state,
        birth_date,
        registration_date,
        positive_ratings,
        negative_ratings,
        blocked,
        admin
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({ 'error': error.message });
  }
};
