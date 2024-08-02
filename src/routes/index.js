import express from 'express';
import { getAllBooks, createBook, putBooks, deleteBooks } from '../controller/bookController.js';
import { createRating } from '../controller/ratingController.js';
import { createRequest } from '../controller/requestController.js';
import { createRequestHistory } from '../controller/requestHistoryController.js';
import { createUser, putUser, deleteUser } from '../controller/userController.js';
import { login } from '../middleware/authAuthentication.js';
import { authenticateToken, validateUserId } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas para users e login (não requerem autenticação)
router.post('/users', createUser);
router.post('/login', login);

// Aplica o middleware authenticateToken em todas as rotas abaixo
router.use(authenticateToken);

// Rotas para books
router.get('/books', getAllBooks);
router.post('/books', validateUserId, createBook);
router.put('/livros/:id', putBooks);//Atualiza o livro de acordo com o ID
router.delete('/livros/:id', deleteBooks);//Deleta o livro de acordo com o ID

// Rotas para ratings
router.post('/ratings', validateUserId, createRating);

// Rotas para users
router.get('/usuarios', getUsers); //Lista os usuários cadastrados no banco de dados//
router.put('/users/:user_id', validateUserId, putUser);
router.delete('/users/:user_id', validateUserId, deleteUser);

// Rotas para requests
router.post('/requests', validateUserId, createRequest);

// Rotas para request history
router.post('/request-history', createRequestHistory);

export default router;
