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
  const userIdFromToken = req.user.userId;
  const userIdFromRequest = req.params.user_id || req.body.user_id;

// Verificação do token para garantir que o user_id do token corresponde ao user_id da requisição
  if (userIdFromToken !== parseInt(userIdFromRequest)) {
    return res.status(403).json({ 'error': 'User ID does not match the authenticated user' });
  }

  next();
};

 