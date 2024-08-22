import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { deleteUser, getAllUsuario, updateUser } from '../services/Users';
import './Perfil.css';

const PerfilUser = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    zip_code: '',
    address: '',
    number: 0,
    neighborhood: '',
    city: '',
    state: '',
    birth_date: ''
  });

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    const data = await getAllUsuario();
    setUsers(data);
  };

  const deleteUsuario = async (id) => {
    try {
      await deleteUser(id);
      getUsuarios();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Ocorreu um erro ao tentar deletar o usuário. Por favor, tente novamente.');
    }
  };

  const handleEdit = (user) => {
    setEditUser(user.user_id);
    setFormData({
      email: user.email,
      password: '', // Inicia com senha vazia
      zip_code: user.zip_code,
      address: user.address,
      number: parseInt(user.number, 10),
      neighborhood: user.neighborhood,
      city: user.city,
      state: user.state,
      birth_date: formatDateInput(user.birth_date)
    });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'zip_code' && value.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
        const data = response.data;

        if (!data.erro) {
          setFormData((prevData) => ({
            ...prevData,
            zip_code: value,
            address: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          }));
        } else {
          alert('CEP inválido! Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente.');
      }
    } else {
      setFormData({ 
        ...formData, 
        [name]: name === 'number' ? parseInt(value, 10) : value 
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateUser(editUser, formData);
      console.log('Resposta do back-end:', response);
      setEditUser(null);
      getUsuarios();
      alert('Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Ocorreu um erro ao tentar atualizar o usuário. Por favor, tente novamente.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatDateInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <h1>Meu Perfil</h1>
      {users.map((user) => (
        <div key={user.user_id} className="user-card">
          {editUser === user.user_id ? (
            <>
              <input name="email" value={formData.email} onChange={handleChange} />
              <input name="password" type="password" value={formData.password} onChange={handleChange} />
              <input name="zip_code" value={formData.zip_code} onChange={handleChange} />
              <input name="address" value={formData.address} onChange={handleChange} />
              <input name="number" value={formData.number} onChange={handleChange} />
              <input name="neighborhood" value={formData.neighborhood} onChange={handleChange} />
              <input name="city" value={formData.city} onChange={handleChange} />
              <input name="state" value={formData.state} onChange={handleChange} />
              <input name="birth_date" type="date" value={formData.birth_date} onChange={handleChange} />
              <div className="button-group">
                <button onClick={handleUpdate} className="btn-save">Salvar</button>
                <button onClick={() => setEditUser(null)} className="btn-cancel">Cancelar</button>
              </div>
            </>
          ) : (
            <>
              <label>Email</label>
              <h4>{user.email}</h4>
              <label>Senha</label>
              <h4>{}</h4>
              <label>CEP</label>
              <h4>{user.zip_code}</h4>
              <label>Endereço</label>
              <h4>{user.address}</h4>
              <label>Número</label>
              <h4>{user.number}</h4>
              <label>Bairro</label>
              <h4>{user.neighborhood}</h4>
              <label>Cidade</label>
              <h4>{user.city}</h4>
              <label>Estado</label>
              <h4>{user.state}</h4>
              <label>Data de Nascimento</label>
              <h4>{formatDate(user.birth_date)}</h4>
              <button id="btn01" onClick={() => handleEdit(user)}>Editar Dados</button>
              <button id="btn02" onClick={() => deleteUsuario(user.user_id)}>Deletar Conta</button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default PerfilUser
