const express = require("express");
const router = express.Router();

const {
  getAdminStats,
  getJoinRequests,
  updateJoinStatus,
  getAllRequests,
  updateRequestStatus,
  getAllProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
  postWorkRequest
} = require("../controllers/adminController");

const { verifyToken } = require("../middlewares/authMiddleware");

// ==========================================
// TABLEAU DE BORD & STATISTIQUES
// ==========================================
router.get(
  "/stats",
  verifyToken,
  getAdminStats
);

// ==========================================
// DEMANDES D'INSCRIPTION
// ==========================================
router.get(
  "/join-requests",
  verifyToken,
  getJoinRequests
);

router.put(
  "/join-requests/:id",
  verifyToken,
  updateJoinStatus
);

// ==========================================
// DEMANDES D'INTERVENTION
// ==========================================
router.get(
  "/requests",
  verifyToken,
  getAllRequests
);

router.put(
  "/requests/:id",
  verifyToken,
  updateRequestStatus
);

// Création d'une nouvelle demande
router.post(
  "/work-requests",
  verifyToken,
  postWorkRequest
);

// ==========================================
// GESTION DES PROFILS
// ==========================================
router.get(
  "/profiles",
  verifyToken,
  getAllProfiles
);

router.post(
  "/profiles",
  verifyToken,
  createProfile
);

router.put(
  "/profiles/:id",
  verifyToken,
  updateProfile
);

router.delete(
  "/profiles/:id",
  verifyToken,
  deleteProfile
);

module.exports = router;