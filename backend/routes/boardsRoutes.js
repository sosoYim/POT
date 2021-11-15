const router = require('express').Router();
const { getBoardData, patchCompletedBoardData, getBoardList, setBoard } = require('../query/boardsQuery');
const { isRequested } = require('../query/requestsQuery');

router.get('/list', (req, res) => {
  const { currentPageNo, recordsPerPage } = req.query;
  const boards = getBoardList(+currentPageNo, +recordsPerPage);

  res.send(boards);
});

router.get('/detail', (req, res) => {
  const { boardId } = req.query;
  const board = getBoardData(boardId);
  const myRequest = isRequested(boardId);
  res.send({ board, myRequest });
});

router.post('/detail', (req, res) => {
  const { boardId } = req.body;
});

router.post('/', (req, res) => {
  const { userId, type, title, content, position } = req.body;

  const board = { userId, type, title, content, position };

  try {
    const boardId = setBoard(board);
    res.status(200).send(boardId + '');
  } catch (err) {
    res.status(400).send(err);
  }
});

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
