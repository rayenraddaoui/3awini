// src/routes/auth.js
const express = require("express");
const router = express.Router();

// On importe les fonctions du contrôleur avec require
const { register, login,logout } = require("../controllers/authcontroller");
const { verifyToken } = require("../middlewares/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/profileController");
// Définition des routes
router.post("/register", register);
router.post("/login", login);

// Route pour la déconnexion
router.post("/logout", verifyToken, logout);
// On exporte le router avec module.exports
module.exports = router;