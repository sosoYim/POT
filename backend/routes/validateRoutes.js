const router = require('express').Router();
const { auth } = require('../utils/verifyToken');

router.get('/', (req, res) => {
  res.send({ isValidateLogin: auth(req, res) });
});

module.exports = router;
