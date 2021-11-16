const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const smtTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.USER,
    pass: process.env.SECRET,
  },
});

async function run() {
  const sendResult = await smtTransport.sendMail({
    from: 'Son <sonwj091552@gmail.com',
    to: 'sonwj0915@naver.com',
    subject: 'SEND SON',
    text: 'Hello world',
  });
  console.log(sendResult);
}

module.exports = run;
