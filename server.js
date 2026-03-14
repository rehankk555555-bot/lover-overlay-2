const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory state store
let overlayState = {
  visible:  true,
  photo:    null,
  name:     'Meri Jaan 💕',
  nickname: 'Sweetheart',
  message:  'Tum mere dil ki dhadkan ho...',
  theme:    'rose',
  position: 'bottom-right',
  heart:    true,
  sparkles: true,
  updatedAt: Date.now()
};

// GET state
app.get('/api/state', (req, res) => {
  res.json(overlayState);
});

// POST state (save from controller)
app.post('/api/state', (req, res) => {
  overlayState = { ...overlayState, ...req.body, updatedAt: Date.now() };
  res.json({ ok: true, updatedAt: overlayState.updatedAt });
});

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`💕 Lover Overlay running on port ${PORT}`);
});
