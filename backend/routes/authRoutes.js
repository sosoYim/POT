const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByAccount, findUser, registerUser, getUsers } = require('../query/userQuery');
const { registerValidation, loginValidation } = require('../utils/validation');

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = {
    account: req.body.account,
    password: hashedPassword,
    summoner: req.body.summoner,
    imageUrl: req.body.imageUrl,
    encryptedId: req.body.encryptedId,
  };

  try {
    registerUser(user);
    res.send({ user: user.account });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/checkid', (req, res) => {
  // Checking if the account is already in the database
  const accountExist = findUserByAccount(req.body.account);
  // 계정 존재 시 false반환(이미 존재하고 있으므로)
  if (accountExist) return res.send(false);

  return res.send(true);
});

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { account, password } = req.body;

  // Checking if the email exists
  const user = findUserByAccount(account);
  if (!user) return res.status(401).send('Email is not found');

  // Password is correct
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(401).send('Invalid password');

  // Create and assign a token
  const token = jwt.sign({ account }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
  // 쿠키에 토큰 설정(http://expressjs.com/ko/api.html#res.cookie)
  res.cookie('jwtToken', token, {
    maxAge: 1000 * 60 * 60 * 24, // 1d
    httpOnly: true,
  });
  // res.send({ account, encryptedId: user.encryptedId });
  return req.query.path ? res.redirect(req.query.path) : res.redirect('/');
});

module.exports = router;
