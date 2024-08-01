import express from 'express';
import { getAllBooks, createBook } from '../controller/bookController.js';
import { createRating } from '../controller/ratingController.js';
import { createRequest } from '../controller/requestController.js';
import { createRequestHistory } from '../controller/requestHistoryController.js';
import { createUser } from '../controller/userController.js';
import { login } from '../middleware/authAuthentication.js';
import { authenticateToken, validateUserId } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas para users e login (não requerem autenticação)
router.post('/users', createUser);
router.post('/login', login);

// Aplica o middleware authenticateToken em todas as rotas abaixo - Rotas PUT e DELETE devem ficar abaixo do router.use(authenticateToken) e também precisam usar o validateUserId
router.use(authenticateToken);

// Rotas para books
router.get('/books', getAllBooks);
router.post('/books', validateUserId, createBook);

// Rotas para ratings
router.post('/ratings', validateUserId, createRating);

// Rotas para users
router.post('/users', createUser);
router.put('/usuarios/:id', userController.putUser);
router.delete('/usuarios/:id', userController.deleteUser );

// Rotas para requests
router.post('/requests', validateUserId, createRequest);

// Rotas para request history
router.post('/request-history', createRequestHistory);

export default router;
