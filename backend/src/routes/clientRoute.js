const express = require("express");
const router = express.Router();

// 1. Importation des fonctions depuis le contrôleur client (On ajoute getAllServices)
const { getClientDashboardData,
     createClientRequest,
      getAllTechnicians, getAnimalServices } = require("../controllers/clientController");

// 2. Importation du middleware de sécurité (JWT)
const { verifyToken } = require("../middlewares/authMiddleware");

// Route pour récupérer l'historique et les compteurs du client
router.get("/dashboard", verifyToken, getClientDashboardData);

// Route pour envoyer une nouvelle demande
router.post("/dashboard", verifyToken, createClientRequest);

// Route pour charger la liste globale des services (Pas besoin de verifyToken si public)
router.get("/services", getAnimalServices);

// Assurez-vous que cette ligne existe bien :
router.get('/services-animaux', getAnimalServices);
router.get("/services-tech", getAllTechnicians); // Route publique ou avec verifyToken selon votre choix
module.exports = router;