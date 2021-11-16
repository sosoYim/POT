const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:5500',
  credentials: true,
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api', routes);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signin.html'));
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`)); // port, callback
