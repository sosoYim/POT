// const fs = require('fs');
const router = require('express').Router();
const { getBoardData } = require('../query/boardsQuery');

router.get('/:id', (req, res) => {
  const boardId = req.path.replace('/', '');
  const { title, position } = getBoardData(boardId);
  res.send({ title, position });
});

// router.get('/:id', (req, res) => {
//   console.log(req.query);
//   res.send(findChampByChampId(1));
// });

module.exports = router;
