const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/authMiddleware");

const {
  getProfile,
  updateProfile
} = require("../controllers/profileController");

// Récupérer le profil de l'utilisateur connecté
router.get(
  "/",
  verifyToken,
  getProfile
);

// Modifier le profil de l'utilisateur connecté
router.put(
  "/",
  verifyToken,
  updateProfile
);

module.exports = router;