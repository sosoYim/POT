const router = require('express').Router();
const { getBoardList } = require('../query/boardQuery');

router.get('/list', (req, res) => {
  const { currentPageNo, recordsPerPage } = req.query;
  const boards = getBoardList(+currentPageNo, +recordsPerPage);

  res.send(boards);
});

module.exports = router;
