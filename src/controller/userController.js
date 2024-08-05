import prisma from '../database/prismaClient.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

//Função para listar os usuários cadastrados no sistema
export const getUsers = async (req, res) => {
  try {
      const usuariosDataBase = await prisma.users.findMany();
      res.status(200).json(usuariosDataBase);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
}

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

// Função para atualizar um usuário
export const putUser = async (req, res) => {
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
    admin
  } = req.body;
  const { user_id } = req.params;

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });

    if (existingUser && existingUser.user_id !== parseInt(user_id)) {
      return res.status(400).json({ error: 'Email is already in use by another user' });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    }

    const updatedUser = await prisma.users.update({
      where: { user_id: parseInt(user_id) },
      data: {
        email,
        password: hashedPassword || existingUser.password,
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
        admin
      }
    });

    // Excluir o campo password do objeto retornado
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Função para deletar um usuário
export const deleteUser = async (req, res) => {
  const { user_id, password } = req.body;

  if (!req.user) {
    return res.status(401).json({ error: 'Ação não autorizada. É necessário realizar login para continuar.' });
  }

  try {
    if (req.user.user_id !== parseInt(user_id)) {
      return res.status(403).json({ error: 'Ação não autorizada. Você não tem permissão para excluir um outro usuário.' });
    }

    const user = await prisma.users.findUnique({ where: { user_id: parseInt(user_id) } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'A senha é inválida.' });
    }

    await prisma.users.delete({
      where: { user_id: parseInt(user_id) }
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
};
