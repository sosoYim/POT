// const fs = require('fs');
const router = require('express').Router();
const { setBoard } = require('../query/boardQuery');

router.get('/list', (req, res) => {
  console.log(req.query);
  res.send('hi');
  // const { getBoards } = require('../utils/userQuery');
});

router.post('/', (req, res) => {
  try {
    const board = {
      userId: req.body.userId,
      type: req.body.type,
      title: req.body.title,
      content: req.body.content,
      position: [...req.body.position],
    };

    setBoard(board);

    // TODO: id 반환하기
    res.status(200).send('id보내야 함');
    console.log(res.body);
  } catch (err) {
    res.status(400).send(err); // 이건머지
  }
});

module.exports = router;
