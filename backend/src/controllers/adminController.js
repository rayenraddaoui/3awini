const supabase = require("../config/supabase");

// ==========================================
// 1. STATISTIQUES DU TABLEAU DE BORD
// ==========================================
const getAdminStats = async (req, res) => {
  try {
    const [passedRequests, workRequests, totalProfiles] = await Promise.all([
      // Nombre de demandes terminées
      supabase.from("demandes").select("*", { count: "exact", head: true }).eq("etat", "termine"),
      
      // Nombre de demandes en cours ou en attente
      supabase.from("demandes").select("*", { count: "exact", head: true }).in("etat", ["en_cours", "en_attente"]),
      
      // Nombre total d'utilisateurs inscrits
      supabase.from("utilisateurs").select("*", { count: "exact", head: true })
    ]);

    if (passedRequests.error) throw passedRequests.error;
    if (workRequests.error) throw workRequests.error;
    if (totalProfiles.error) throw totalProfiles.error;

    return res.status(200).json({
      success: true,
      stats: {
        passedRequestsCount: passedRequests.count || 0,
        workRequestsCount: workRequests.count || 0,
        joinRequestsCount: 0, 
        profilesCount: totalProfiles.count || 0,
        globalViewCount: totalProfiles.count || 0
      }
    });
  } catch (error) {
    console.error("Erreur stats admin :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 2. LOGIQUE DE DEMANDE D'INSCRIPTION
// ==========================================
const getJoinRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("utilisateurs")
      .select("id, nom, prenom, email, telephone, role")
      .order("id", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, requests: data });
  } catch (error) {
    console.error("Erreur récupération inscriptions :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateJoinStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    return res.status(200).json({ success: true, message: `Statut inscription : ${status}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 3. SUIVI DES DEMANDES (PASSEES & TRAVAIL)
// ==========================================
const getAllRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("demandes")
      .select(`
        id,
        description,
        etat,
        date_demande,
        client:utilisateurs!client_id(nom, prenom, telephone),
        technicien:utilisateurs!technicien_id(nom, prenom),
        service:services(titre)
      `)
      .order("date_demande", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, requests: data });
  } catch (error) {
    console.error("Erreur récupération demandes :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { etat } = req.body; 

    const { data, error } = await supabase
      .from("demandes")
      .update({ etat })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return res.status(200).json({ success: true, request: data });
  } catch (error) {
    console.error("Erreur mise à jour demande :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 4. CRUD COMPLET DES PROFILS (UTILISATEURS)
// ==========================================
const getAllProfiles = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("utilisateurs")
      .select("id, nom, prenom, email, telephone, role")
      .order("id", { ascending: false });

    if (error) throw error;
    return res.status(200).json({ success: true, profiles: data });
  } catch (error) {
    console.error("Erreur lecture profils :", error);
    return res.status(500).json({ success: false, message: error.message });
  } 
};

// [POST] Créer un nouveau profil
const createProfile = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, role } = req.body;

    const { data, error } = await supabase
      .from("utilisateurs")
      .insert([{ nom, prenom, email, telephone, role }])
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json({ success: true, profile: data });
  } catch (error) {
    console.error("Erreur création profil :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// [PUT] Mettre à jour un profil existant
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, telephone, role } = req.body;

    const { data, error } = await supabase
      .from("utilisateurs")
      .update({ nom, prenom, telephone, role })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return res.status(200).json({ success: true, profile: data });
  } catch (error) {
    console.error("Erreur modification profil :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// [DELETE] Supprimer définitivement un utilisateur
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("utilisateurs")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return res.status(200).json({ success: true, message: "Profil supprimé avec succès." });
  } catch (error) {
    console.error("Erreur suppression profil :", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// ==========================================
// 5. CREER UNE DEMANDE DE TRAVAIL
// ==========================================
const postWorkRequest = async (req, res) => {
  try {
    const {
      client_id,
      service_id,
      description,
      adresse
    } = req.body;

    const { data, error } = await supabase
      .from("demandes")
      .insert([
        {
          client_id,
          service_id,
          description,
          adresse,
          etat: "en_attente",
          date_demande: new Date()
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      request: data
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAdminStats,
  getJoinRequests,
  updateJoinStatus,
  getAllRequests,
  updateRequestStatus,
  getAllProfiles,
  createProfile,
  postWorkRequest,
  updateProfile,
  deleteProfile
};