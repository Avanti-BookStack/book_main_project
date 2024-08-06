import prisma from '../database/prismaClient.js';

export const createRequestHistory = async (req, res) => {
  const {
    request_id,
    previous_status,
    current_status,
    change_date
  } = req.body;

  // Validação para garantir que request_id existe
  const requestExists = await prisma.requests.findUnique({
    where: { request_id }
  });

  if (!requestExists) {
    return res.status(404).json({ 'error': 'Request not found' });
  }

  try {
    const newRequestHistory = await prisma.request_history.create({
      data: {
        request_id,
        previous_status,
        current_status,
        change_date
      },
    });
    res.status(201).json(newRequestHistory);
  } catch (error) {
    res.status(404).json({ 'error': error.message });
  }
};

export const getHistoryRequest = async (req, res) => {
  try {
    const requestHistory = await prisma.request_history.findMany()
    res.status(201).json(requestHistory)
  }catch(error){
    res.status(404).json({ error: error.message })
  }
}