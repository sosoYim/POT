const router = require('express').Router();
const { checkUserAuth } = require('../utils/verifyToken');
const { getSummoner } = require('../query/validateQuery');

router.get('/', checkUserAuth, (req, res) => {
  const { userId } = req;

  res.send({ summoner: userId ? getSummoner(userId) : null });
});

module.exports = router;
