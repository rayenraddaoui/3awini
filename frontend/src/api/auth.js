import api from './api';

// ==========================================
// AUTHENTIFICATION
// ==========================================

// URL Backend : POST http://localhost:5000/api/auth/login
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// URL Backend : POST http://localhost:5000/api/auth/register
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// URL Backend : POST http://localhost:5000/api/auth/logout (Nouveau)
export const logoutUser = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

