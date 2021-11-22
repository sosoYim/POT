const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByEmail, findUser, registerUser, getUsers, updateUserSummoner } = require('../query/userQuery');
const { registerValidation, loginValidation } = require('../utils/validation');

router.post('/register', async (req, res) => {
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

router.post('/updateUserSummoner', (req, res) => {
  const { jwtToken } = req.cookies;
  const { summoner, encryptedId } = req.body;

  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
  const { userId } = decoded;

  updateUserSummoner(userId, summoner, encryptedId);
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
  // console.log(user);

  const { userId } = user;
  // Create and assign a token
  const jwtToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
  // 쿠키에 토큰 설정(http://expressjs.com/ko/api.html#res.cookie)
  res.cookie('jwtToken', jwtToken, {
    maxAge: 1000 * 60 * 60 * 24, // 1d
    httpOnly: true,
  });

  res.send({ userId: user.userId });
});

module.exports = router;
