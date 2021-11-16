const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const mailer = require('express-mailer');
const routes = require('./routes');
const auth = require('./utils/verifyToken');
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:5500',
  credentials: true,
};

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('hihi');
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);

// mailer.extend(app, {
//   from: 'no-reply@example.com',
//   host: 'smtp.gmail.com', // hostname
//   secureConnection: true, // use SSL
//   port: 465, // port for secure SMTP
//   transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//   auth: {
//     user: 'sonwj091552@gmail.com',
//     pass: 'SONwj*963.',
//   },
// });

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`)); // port, callback
