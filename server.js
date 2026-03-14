const express = require('express');
const path = require('path');
const app = express();

app.use(express.json({ limit: '10mb' }));

let state = {
  visible: true, photo: null,
  name: 'Meri Jaan 💕', nickname: 'Sweetheart',
  message: 'Tum mere dil ki dhadkan ho...',
  theme: 'rose', position: 'bottom-right',
  heart: true, sparkles: true
};

app.get('/api/state', (req, res) => res.json(state));

app.post('/api/state', (req, res) => {
  state = { ...state, ...req.body };
  res.json({ ok: true });
});

app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('💕 Running on port', PORT));
