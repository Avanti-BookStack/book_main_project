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

//Atualiza os usuários cadastrados no banco de dados//
const putUser = async (req, res) => {
  const { email, password, name, zip_code, address, number, neighborhood, city, state, birth_date, registration_date, positive_ratings, negative_ratings, admin } = req.body;
  const { id } = req.params;

  try {
      const existingUser = await prisma.users.findUnique({ where: { email } });

      if (existingUser && existingUser.user_id !== parseInt(id)) {
          return res.status(400).json({ error: 'Email já está em uso por outro usuário' });
      }

      const usuarioDataBase = await prisma.users.update({
          where: { user_id: parseInt(id) },
          data: {
              email, password, name, zip_code, address, number, neighborhood, city, state, birth_date, registration_date, positive_ratings, negative_ratings, admin
          }
      });

      res.status(200).json(usuarioDataBase);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
}

//Deleta os usuários cadastrados no banco de dados//
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
      const usuarioDataBase = await prisma.users.delete({
          where: { user_id: parseInt(id) }
      });
      res.status(204).send();
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
}


module.exports = {
  putUser,
  deleteUser
}