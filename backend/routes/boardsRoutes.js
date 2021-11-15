const router = require('express').Router();
const { getBoardData, patchCompletedBoardData } = require('../query/boardsQuery');

router.get('/manage/:id', (req, res) => {
  const boardId = req.path.replace('/manage/', '');
  const { title, position } = getBoardData(boardId);
  res.send({ title, position });
});

router.patch('/participant/:id', (req, res) => {
  const {
    body: { completed },
    path,
  } = req;
  const [boardId, userId] = path.replace('/participant/', '').split('=');
  patchCompletedBoardData(boardId, userId, completed);
  res.send();
});
module.exports = router;
