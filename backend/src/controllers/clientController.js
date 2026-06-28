const supabase = require("../config/supabase");

/**
 * Récupère les données du dashboard client (compteurs + demandes récentes)
 * GET /api/client/dashboard
 */
exports.getClientDashboardData = async (req, res) => {
  try {
    const clientId = req.user.id; 

    // Récupération des demandes du client
    const { data: requests, error: reqError } = await supabase
      .from("demandes")
      .select("*")
      .eq("client_id", clientId)
      .order("date_demande", { ascending: false });

    if (reqError) throw reqError;

    // Calcul dynamique des compteurs (stats)
    const stats = {
      enCours: requests.filter(r => r.etat === "En attente" || r.etat === "Acceptée").length,
      traetees: requests.filter(r => r.etat === "Refusée" || r.etat === "Terminée").length
    };

    return res.status(200).json({
      success: true,
      stats,
      recentRequests: requests
    });

  } catch (error) {
    console.error("Erreur Dashboard Client:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Crée une nouvelle demande de service (Technicien ou Animal) pour le client connecté
 * POST /api/client/dashboard
 */
exports.createClientRequest = async (req, res) => {
  try {
    const clientId = req.user.id; 
    const { 
      service_id, // Contient maintenant l'ID provenant de la table 'tous_les_services'
      etat, 
      date_demande, 
      ownerName, 
      ownerPhone, 
      animalName, 
      animalType, 
      address, 
      notes 
    } = req.body;

    // ✅ Insertion propre dans les colonnes individuelles réelles de ta table
   const { data, error } = await supabase
  .from("demandes")
  .insert([
    {
      client_id: clientId,
      technicien_id: null,
      service_id: service_id,
      description: `Demande d'intervention unifiée`, 
      etat: etat || "En attente",
      date_demande: date_demande || new Date().toISOString(),
      nom_client: ownerName,
      telephone_client: ownerPhone,
      nom_animal: animalName || null,           
      
      // ⚠️ Si tu gardes le slash, la clé doit obligatoirement être écrite comme ceci :
      "type_animal/type_pane": animalType || null, 
      
      adresse: address,
      notes: notes || null
    }
  ])
  .select();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message: "Demande enregistrée avec succès !",
      data: data[0]
    });

  } catch (error) {
    console.error("Erreur création demande client:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Récupère tous les techniciens disponibles depuis la table unifiée
 * GET /api/services-tech
 */
exports.getAllTechnicians = async (req, res) => {
  try {
    // ✅ On interroge la nouvelle table 'tous_les_services' en filtrant uniquement sur les techniciens
    const { data: technicians, error } = await supabase
      .from("tous_les_services")
      .select("id, nom, description, prix, ref_id")
      .eq("type_service", "technicien")
      .order("id", { ascending: true });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      data: technicians
    });
  } catch (error) {
    console.error("Erreur récupération techniciens:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
/**
 * GET /api/services-animaux
 * Récupère la liste des services disponibles depuis la table 'categories_animaux'
 */
exports.getAnimalServices = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories_animaux')
      .select('id, nom, description')
      .order('id', { ascending: true });

    if (error) throw error;

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Erreur récupération services:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};