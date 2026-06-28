import api from './api'; // Votre instance Axios configurée

/**
 * Récupère les données du dashboard client (Stats + Demandes récentes)
 */
export const getClientDashboard = async () => {
  try {
    const response = await api.get('/client/dashboard'); 
    return response.data;
  } catch (error) {
    console.error("Erreur dans getClientDashboard:", error);
    throw error;
  }
};

/**
 * Soumet une nouvelle demande de service (Technicien ou Animal)
 */
export const createClientRequest = async (requestData) => {
  try {
    const response = await api.post('/client/dashboard', requestData);
    return response.data;
  } catch (error) {
    console.error("Erreur dans createClientRequest:", error);
    throw error;
  }
};

/**
 * Récupère la liste des services disponibles (Filtre Techniciens géré par le backend)
 * depuis la table unifiée tous_les_services
 */
export const getAllTechnicians = async () => {
  try {
    const response = await api.get('/client/services-tech');
    return response.data; // Renvoie la liste filtrée { success: true, data: [...] }
  } catch (error) {
    console.error("Erreur dans getAllTechnicians:", error);
    throw error;
  }
};
// Dans src/api/client.js
export const getAnimalServices = async () => {
  try {
    // On ajoute '/client' pour correspondre au préfixe app.use("/api/client", ...)
    const response = await api.get('/client/services-animaux'); 
    return response.data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
};