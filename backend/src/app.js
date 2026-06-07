const express = require('express');
const cors = require('cors');
const supabase = require('./config/supabase');

const app = express();

app.use(cors());
app.use(express.json());

// TEST DB
app.get('/users', async (req, res) => {
  const { data, error } = await supabase
    .from('utilisateurs')
    .select('*');

  if (error) return res.status(400).json(error);

  res.json(data);
});

module.exports = app;