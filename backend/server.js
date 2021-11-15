const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes');
const auth = require('./utils/verifyToken');
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:5500',
  credentials: true,
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('../public'));
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`)); // port, callback
