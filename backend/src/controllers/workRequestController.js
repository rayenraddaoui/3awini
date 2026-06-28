const supabase = require("../config/supabase");

const createWorkRequest = async (req, res) => {
  try {
    // 1. Vérification de la présence de l'utilisateur authentifié
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié."
      });
    }

    const {
      type_demande,
      titre,
      specialite,
      localisation,
      telephone_contact,
      date_souhaitee,
      description
    } = req.body;

    const userId = req.user.id;

    // 2. Validation des champs obligatoires
    if (!titre || !specialite || !description) {
      return res.status(400).json({
        success: false,
        message: "Veuillez remplir tous les champs obligatoires."
      });
    }

    // 3. Nettoyage de la date pour éviter les crashs de casting Postgres
    const dateFormatted = date_souhaitee && date_souhaitee.trim() !== "" ? date_souhaitee : null;

    // 4. Insertion dans Supabase
    const { data, error } = await supabase
      .from("demandes_rejoindre")
      .insert([
        {
          user_id: userId,
          type_demande,
          titre,
          specialite,
          localisation,
          telephone_contact,
          date_souhaitee: dateFormatted,
          description,
          etat: "en_attente"
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message: "Votre demande a été envoyée avec succès.",
      request: data
    });

  } catch (error) {
    console.error("Erreur [createWorkRequest]:", error);

    return res.status(500).json({
      success: false,
      message: "Une erreur interne est survenue lors de l'envoi de la demande."
    });
  }
};

const getMyWorkRequests = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non authentifié."
      });
    }

    const { data, error } = await supabase
      .from("demandes_rejoindre")
      .select("*")
      .eq("user_id", req.user.id)
      .order("id", { ascending: false });

    if (error) throw error;

    return res.json({
      success: true,
      requests: data
    });

  } catch (error) {
    console.error("Erreur [getMyWorkRequests]:", error);

    return res.status(500).json({
      success: false,
      message: "Impossible de récupérer vos demandes."
    });
  }
};

module.exports = {
  createWorkRequest,
  getMyWorkRequests
};