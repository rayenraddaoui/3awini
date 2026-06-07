const express = require('express');
const router = express.Router();
const pool = require('../config/supabase');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY id'
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erreur: 'Erreur serveur'
    });
  }
});

module.exports = router;