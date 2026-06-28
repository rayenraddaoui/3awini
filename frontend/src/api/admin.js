import api from './api'; 

// ==========================================
// 1. STATISTIQUES & TABLEAU DE BORD
// ==========================================
export const fetchAdminDashboardStats = async () => {
  const response = await api.get('/admin/stats');
  return response.data;
};

// ==========================================
// 2. DEMANDES D'INSCRIPTION (JOIN REQUESTS)
// ==========================================
export const fetchJoinRequests = async () => {
  const response = await api.get('/admin/join-requests');
  return response.data;
};

export const putJoinStatus = async (id, status) => {
  const response = await api.put(`/admin/join-requests/${id}`, { status });
  return response.data;
};

// ==========================================
// 3. SUIVI DES DEMANDES D'INTERVENTION
// ==========================================
export const fetchAllRequests = async () => {
  const response = await api.get('/admin/requests');
  return response.data;
};

export const patchRequestStatus = async (id, etat) => {
  const response = await api.put(`/admin/requests/${id}`, { etat });
  return response.data;
};

// ==========================================
// 4. CRUD COMPLET DES PROFILS (UTILISATEURS)
// ==========================================
export const fetchAllProfiles = async () => {
  const response = await api.get('/admin/profiles');
  return response.data;
};
export const postWorkRequest = async (requestData) => {
  const response = await api.post('/admin/requests', requestData);
  return response.data;
}
export const postProfile = async (profileData) => {
  const response = await api.post('/admin/profiles', profileData);
  return response.data;
};

export const putProfile = async (id, profileData) => {
  const response = await api.put(`/admin/profiles/${id}`, profileData);
  return response.data;
};

export const removeProfile = async (id) => {
  const response = await api.delete(`/admin/profiles/${id}`);
  return response.data;
};