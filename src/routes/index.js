import express from 'express';
import { getAllBooks, createBook } from '../controller/bookController.js';
import { createUser } from '../controller/userController.js';
import { createRequest } from '../controller/requestController.js';
import { createRequestHistory } from '../controller/requestHistoryController.js';
import { createRating } from '../controller/ratingController.js';

const router = express.Router();

// Rotas para books
router.get('/books', getAllBooks);
router.post('/books', createBook);

// Rotas para users
router.post('/users', createUser);

// Rotas para requests
router.post('/requests', createRequest);

// Rotas para request history
router.post('/request-history', createRequestHistory);

// Rotas para ratings
router.post('/ratings', createRating);

export default router;
