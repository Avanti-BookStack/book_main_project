import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';  // Importe o cors

dotenv.config();

const app = express();
app.use(express.json());

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:5173'  // Altere para a origem do seu frontend
}));

app.use(routes);

export default app;
