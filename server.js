const express = require('express');
const fs = require('fs');
const fetchClues = require('./fetch_clues');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/clues.json', (req, res) => {
  const data = fs.readFileSync('./data/clues.json', 'utf-8');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.get('/refresh', async (req, res) => {
  await fetchClues();
  res.send({ status: 'refreshed' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
