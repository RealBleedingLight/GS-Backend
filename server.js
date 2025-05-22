const uploadClues = require('./upload_clues');
const express = require('express');   // ✅ Require express first
const cors = require('cors');         // ✅ Then cors
const fs = require('fs');
const fetchClues = require('./fetch_clues');

const app = express();                // ✅ Now it's safe to use express()
app.use(cors());                      // ✅ CORS applied

const PORT = process.env.PORT || 3000;

app.get('/clues.json', (req, res) => {
  try {
    const data = fs.readFileSync('./data/clues.json', 'utf-8');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  } catch (err) {
    res.status(500).send({ error: "clues.json not found" });
  }
});

app.get('/refresh', async (req, res) => {
  try {
    await fetchClues();
    res.send({ status: 'refreshed' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
