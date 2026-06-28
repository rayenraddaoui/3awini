import api from './api'; // ◄◄ CORRECTION : On importe ton instance personnalisée

// ==========================================
// PROFIL (Routes sur /profile)
// ==========================================

// URL Backend : GET http://localhost:5000/api/profile
export const getProfile = async () => {
  const response = await api.get('/profile'); 
  return response.data;
};

// URL Backend : PUT http://localhost:5000/api/profile
export const updateUserProfile = async (updatedData) => {
  const response = await api.put('/profile', updatedData); 
  return response.data;
};