const bcrypt = require("bcryptjs");
const supabase = require("../config/supabase");
const generateToken = require("../utils/generateToken"); 

// ==========================================
// INSCRIPTION (REGISTER)
// ==========================================
const register = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      email,
      password,
      telephone
    } = req.body;

    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({
        message: "Nom, prénom, email et mot de passe sont obligatoires."
      });
    }

    // Vérifier si l'email existe déjà
    const { data: existingUser, error: checkError } = await supabase
      .from("utilisateurs")
      .select("id")
      .eq("email", email);

    if (checkError) throw checkError;

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "Cet email est déjà utilisé."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error: insertError } = await supabase
      .from("utilisateurs")
      .insert([
        {
          nom,
          prenom,
          email,
          telephone: telephone || null,
          mot_de_passe: hashedPassword,
          role: "client"
        }
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    const token = generateToken(newUser.id, res);

    return res.status(201).json({
      success: true,
      message: "Compte créé avec succès.",
      token,
      utilisateur: {
        id: newUser.id,
        nom: newUser.nom,
        prenom: newUser.prenom,
        email: newUser.email,
        telephone: newUser.telephone,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ==========================================
// CONNEXION (LOGIN)
// ==========================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Veuillez fournir un email et un mot de passe" });
    }

    const { data: user, error: searchError } = await supabase
      .from('utilisateurs')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (searchError) throw searchError;
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const isMatch = await bcrypt.compare(password, user.mot_de_passe);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    // Génère le cookie JWT via la fonction utilitaire
    const token = generateToken(user.id, res);

    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        name: user.nom,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// ==========================================
// DÉCONNEXION (LOGOUT)
// ==========================================
const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), 
  });
  return res.status(200).json({ message: "Déconnexion réussie" });
};

module.exports = {
  register,
  login,
  logout
};