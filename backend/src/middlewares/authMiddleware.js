// backend/src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // CORRECTION : On récupère le token depuis les cookies HTTP-only
  const token = req.cookies && req.cookies.jwt;

  if (!token) {
    return res.status(403).json({ message: "Accès refusé. Aucun token fourni." });
  }

  try {
    // Vérification et décodage du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    
    // On injecte les infos décodées (id, email, role) dans l'objet 'req'
    req.user = decoded;
    
    // On passe au contrôleur suivant
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

module.exports = { verifyToken };