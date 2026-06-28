const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Import du client Supabase
const supabase = require("./config/supabase");

// Import des routeurs
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categories");
const profileRoutes = require("./routes/profileRoute");
const adminRoutes = require("./routes/adminRoute");
const workRequestRoutes = require("./routes/workRequest");
const clientRoutes = require("./routes/clientRoute"); // ◄◄ 1. IMPORTATION du nouveau routeur client

const app = express();

// 1. Middlewares globaux
app.use(cors({
  origin: "http://localhost:5173", // Adresse du frontend React (Vite)
  credentials: true,                // Autorise les cookies et headers de session
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// 2. Branchement des routes de l'API
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/work-requests", workRequestRoutes);
app.use("/api/client", clientRoutes); // ◄◄ 2. BRANCHEMENT sur le préfixe /api/client

// 3. Route de test rapide pour Supabase (Nettoyée)
app.get("/users", async (req, res) => {
  try {
    const { data, error } = await supabase.from("utilisateurs").select("*");
    if (error) throw error;
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = app;