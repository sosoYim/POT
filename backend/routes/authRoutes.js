const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByEmail, findUser, registerUser, getUsers } = require('../query/userQuery');
const { registerValidation, loginValidation } = require('../utils/validation');

router.post('/register', async (req, res) => {
  console.log(req.body);
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = {
    email: req.body.email,
    password: hashedPassword,
    summoner: req.body.summoner,
    imageUrl: req.body.imageUrl,
    encryptedId: req.body.encryptedId,
  };

  try {
    registerUser(user);
    res.send({ user: user.email });
    return res.redirect('/login');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/checkid', (req, res) => {
  // Checking if the email is already in the database
  const emailExist = findUserByEmail(req.body.email);
  // 계정 존재 시 false반환(이미 존재하고 있으므로)
  if (emailExist) return res.send(false);

  return res.send(true);
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  // Checking if the email exists
  const user = findUserByEmail(email);
  if (!user) return res.status(401).send('Email is not found');

  // Password is correct
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(401).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
  // 쿠키에 토큰 설정(http://expressjs.com/ko/api.html#res.cookie)
  res.cookie('jwtToken', token, {
    maxAge: 1000 * 60 * 60 * 24, // 1d
    httpOnly: true,
  });
  res.cookie('summoner', user.summoner, {
    maxAge: 1000 * 60 * 60 * 24, // 1d
    httpOnly: true,
  });
  res.cookie('encryptedId', user.encryptedId, {
    maxAge: 1000 * 60 * 60 * 24, // 1d
    httpOnly: true,
  });

  console.log('hi');

  res.redirect('/');
  return res.redirect('/');

  // return req.query.path ? res.redirect(req.query.path) : res.redirect('/');
  // res.send({ email, encryptedId: user.encryptedId });
  // res.redirect('/');
  // return req.query.path ? res.redirect(req.query.path) : res.redirect('/');
});

module.exports = router;
