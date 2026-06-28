import api from './api'; // Même instance avec la baseURL "http://localhost:5000/api"

// ==========================================
// DEMANDES DE TRAVAIL (Routes sur /work-requests)
// ==========================================

// URL Backend : POST http://localhost:5000/api/work-requests
export const postWorkRequest = async (payload) => {
  const response = await api.post('/work-requests', payload);
  return response.data;
};

// URL Backend : GET http://localhost:5000/api/work-requests/my
export const getMyWorkRequests = async () => {
  const response = await api.get('/work-requests/my');
  return response.data;
};