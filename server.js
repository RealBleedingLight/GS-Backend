const uploadClues = require('./upload_clues');
const express = require('express');   // ✅ Require express first
const cors = require('cors');         // ✅ Then cors
const fs = require('fs');
const fetchClues = require('./fetch_clues');

const app = express();
app.use(cors());

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
    await fetchClues();         // ✅ Step 1: Fetch from Notion
    await uploadClues();        // ✅ Step 2: Upload to Supabase
    res.send({ status: '✅ Refreshed and uploaded to Supabase' });
  } catch (err) {
    console.error('❌ Refresh failed:', err.message);
    res.status(500).send({ error: err.message });
  }
});

// Optional: auto-refresh once on startup
fetchClues()
  .then(() => uploadClues())
  .then(() => console.log('✅ Initial sync completed'))
  .catch(err => console.error('❌ Initial sync failed:', err));

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
