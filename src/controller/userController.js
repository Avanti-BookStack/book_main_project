import prisma from '../database/prismaClient.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

// Função para criar um novo usuário com senha hash
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
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
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

    // Excluir o campo password do objeto retornado
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ 'error': error.message });
  }
};
