// const fs = require('fs');
const express = require('express');

const router = express.Router();
const path = require('path');
const { getBoardData, getBoardList, setBoard } = require('../query/boardsQuery');

// 원재님***
// router.get('/:id', (req, res) => {
//   const boardId = req.path.replace('/', '');
//   const { title, position } = getBoardData(boardId);
//   res.send({ title, position });
// });

router.get('/list', (req, res) => {
  const { currentPageNo, recordsPerPage } = req.query;
  const boards = getBoardList(+currentPageNo, +recordsPerPage);

  res.send(boards);
});

router.get('/detail', (req, res) => {
  console.log('/detail/:id 통신 성공 보드 정보 넘겨주겠다');
  res.send('send');
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
    res.status(200).send(boardId + '');
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.get('/:id', (req, res) => {
//   console.log(req.query);
//   res.send(findChampByChampId(1));
// });

module.exports = router;
