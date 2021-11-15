const router = require('express').Router();
const { getBoardList, setBoard } = require('../query/boardQuery');

router.get('/list', (req, res) => {
  const { currentPageNo, recordsPerPage } = req.query;
  const boards = getBoardList(+currentPageNo, +recordsPerPage);

  res.send(boards);
});

router.get('/detail/:id', (req, res) => {
  console.log('hi detail');
  console.log(req.query);
});

router.post('/', (req, res) => {
  // TODO: 포지션 이름 상수로 빼기
  const position = { top: false, jug: false, mid: false, adc: false, sup: false };
  const checkedPosition = [...req.body.position];
  for (const name of Object.keys(position)) {
    position[name] = checkedPosition.includes(name);
  }

  // TODO: id받기
  const board = {
    userId: 1,
    type: req.body.type,
    title: req.body.title,
    content: req.body.content,
    position,
  };
  try {
    const boardId = setBoard(board);
    // window.location.assign(window.location.host + `/boards/${boardId}`);
    // window.location.assign('www.naver.com');
    // res.status(200).redirect(`/api/detail/${boardId}`);
    res.status(200).send(boardId + '');
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
