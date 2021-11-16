const router = require('express').Router();
const { getBoardData, patchCompletedBoardData, getBoardList, setBoard } = require('../query/boardsQuery');
const { isMyRequest, setRequest } = require('../query/requestsQuery');

router.get('/list', (req, res) => {
  const { type, position, currentPageNo, recordsPerPage } = req.query;
  const boards = getBoardList(type, position, +currentPageNo, +recordsPerPage);

  res.send(boards);
});

router.post('/', (req, res) => {
  const { type, title } = req.body;
  let { userId, content, position } = req.body;
  userId = +userId;
  content = JSON.parse(content);
  position = JSON.parse(position);
  const board = { userId, type, title, content, position };

  try {
    const boardId = setBoard(board);
    res.status(200).send(boardId + '');
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/detail', (req, res) => {
  // TODO: 프론트에서 쿠키로 값을 찾아와야 함
  const userId = 3;
  const { boardId } = req.query;
  const board = getBoardData(boardId);
  const myRequest = isMyRequest(userId, boardId);
  res.send({ board, myRequest });
});

router.post('/detail', (req, res) => {
  const { boardId, userId, position } = req.body;
  const request = { boardId: +boardId, userId: +userId, position };
  // 방어코드 : 이미 신청한 요청이면 저장하지 않는다.
  // const requestId = isMyRequest(userId, boardId) ? -1 : setRequest(request);
  const requestId = setRequest(request);
  res.send(requestId + '');
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
