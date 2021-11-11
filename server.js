const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const users = require('./model/users');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.get('/*', (req, res) => {
  res.send('hi');
  // res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`)); // port, callback
