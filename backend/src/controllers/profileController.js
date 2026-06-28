const supabase = require("../config/supabase");

// ==========================================
// LIRE LE PROFIL (GET)
// ==========================================
const getProfile = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('utilisateurs')
      .select('id, nom, prenom, email, telephone, photo, role')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    return res.status(200).json({ 
      user: {
        id: user.id,
        name: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        photo: user.photo,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Erreur dans getProfile:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// ==========================================
// MODIFIER LE PROFIL (PUT) - NOUVEAU
// ==========================================
const updateProfile = async (req, res) => {
  try {
    const { name, prenom, telephone, photo } = req.body;

    // Mise à jour dans Supabase (on retransforme 'name' du front en 'nom' pour le back)
    const { data: updatedUser, error } = await supabase
      .from('utilisateurs')
      .update({
        nom: name,
        prenom: prenom || null,
        telephone: telephone || null,
        photo: photo || null
      })
      .eq('id', req.user.id)
      .select('id, nom, prenom, email, telephone, photo, role')
      .single();

    if (error) throw error;

    return res.status(200).json({
      message: "Profil mis à jour avec succès",
      user: {
        id: updatedUser.id,
        name: updatedUser.nom,
        prenom: updatedUser.prenom,
        email: updatedUser.email,
        telephone: updatedUser.telephone,
        photo: updatedUser.photo,
        role: updatedUser.role
      }
    });
  } catch (error) {
    console.error("Erreur dans updateProfile:", error);
    return res.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
  }
};

module.exports = {
  getProfile,
  updateProfile // Pense à bien exporter la nouvelle fonction
};