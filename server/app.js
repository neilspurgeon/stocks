const express = require('express');
const path = require('path');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// parse application/json
app.use(bodyParser.json());

// Routes
router(app);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;