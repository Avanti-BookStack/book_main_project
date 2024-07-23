import express from 'express';
import { getAllBooks, createBook } from '../controller/bookController.js';
import { createUser } from '../controller/userController.js';
import { createRequest } from '../controller/requestController.js';
import { createRequestHistory } from '../controller/requestHistoryController.js'; // Corrigir o nome da importação

const router = express.Router();

// Rotas para books
router.get('/books', getAllBooks);
router.post('/books', createBook);

// Rotas para users
router.post('/users', createUser);

// Rotas para requests
router.post('/requests', createRequest);

// Rotas para request history
router.post('/request_history', createRequestHistory); // Corrigir o nome da rota

export default router;
