// const fs = require('fs');
const router = require('express').Router();

router.get('/list', (req, res) => {
  console.log(req.query);
  res.send('hi');
});

module.exports = router;
