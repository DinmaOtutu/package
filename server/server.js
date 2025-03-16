const express = require('express');
const path = require('path');
const calendarRoutes = require('../src/routes/calendarRoutes');

const app = express();
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.json());
app.use(express.static(DIST_DIR));
app.use('/api', calendarRoutes);

app.get('/', (_, res) => {
  res.sendFile(HTML_FILE);
});

module.exports = app;