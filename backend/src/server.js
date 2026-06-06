const express = require('express');

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Serveur Express fonctionne !');
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});