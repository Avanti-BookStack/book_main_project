import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    
    return response.data;
  }catch(error) {
    throw error.response?.data || "Error ao realizar login.";
  }
  
};