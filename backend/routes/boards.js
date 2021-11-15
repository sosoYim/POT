// const fs = require('fs');
const router = require('express').Router();
const { setBoard } = require('../query/boardQuery');
// const { auth } = require('../utils/verifyToken');

router.get('/list', (req, res) => {
  console.log(req.query);
  res.send('hi');
  // const { getBoards } = require('../utils/userQuery');
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

router.get('/detail/:id([0-9]+)', (req, res) => {
  console.log(req.query);
  res.send('hoho');
});

module.exports = router;
