import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export const validateUserId = (req, res, next) => {
  const { user_id } = req.body;

  // Verificação do token para garantir que o user_id do token corresponde ao user_id da requisição
  if (req.user.userId !== user_id) {
    return res.status(403).json({ 'error': 'User ID does not match the authenticated user' });
  }

  next();
};
