import express from 'express';
import { getAllBooks, createBook } from '../controller/bookController.js';
import { createUser } from '../controller/userController.js';

const router = express.Router();

// Rotas para books
router.get('/books', getAllBooks);
router.post('/books', createBook);

// Rotas para users
router.post('/users', createUser);

export default router;
