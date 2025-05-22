// upload_clues.js
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();


const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadClues() {
  const filePath = path.join(__dirname, 'data', 'clues.json');

  try {
    const fileBuffer = fs.readFileSync(filePath);

    const { error } = await supabase.storage
      .from('clues')
      .upload('clues.json', fileBuffer, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'application/json',
      });

    if (error) {
      console.error('❌ Upload failed:', error.message);
    } else {
      console.log('✅ clues.json uploaded to Supabase');
    }
  } catch (err) {
    console.error('❌ File read or upload failed:', err.message);
  }
}

uploadClues();
