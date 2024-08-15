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

export const registerUser = async (email, password, name, zip_code, address, number, neighborhood, city, state, birth_date, registration_date, positive_ratings, negative_ratings, blocked, admin) => {
  try {
    const response = await api.post('/users', {
      email, 
      password,
      name,
      zip_code,
      address,
      number: Number(number),
      neighborhood,
      city,
      state,
      birth_date,
      registration_date,
      positive_ratings,
      negative_ratings,
      blocked,
      admin
    })

    return response.data
  }catch(error){
    throw error.response?.data || "Error ao cadastrar usuário."
  }
}
/*
	"email": "riamstefeson@gmail.com",
	"password": "1234",
	"name": "Riam",
	"zip_code": "59360-000",
	"address": "Jose Eufrásio de Medeiros",
	"number": 213,
	"neighborhood": "Maria Terceira",
	"city": "Caicó",
	"state": "RN",
	"birth_date": "2011-08-30T13:22:53.108+00:00",
	"registration_date": "2011-08-30T13:22:53.108+00:00",
	"positive_ratings": 0,
	"negative_ratings": 0,
	"blocked": false,
	"admin": false
*/