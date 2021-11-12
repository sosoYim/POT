const fs = require('fs');
const router = require('express').Router();

router.get('/list', (req, res) => {
  console.log(req.query);
  res.send('hi');
  // const { getBoards } = require('../utils/userQuery');
});

router.post('/', (req, res) => {
  try {
    const board = {
      boardId: req.body.boardId,
      userId: req.body.userId,
      type: req.body.type,
      title: req.body.title,
      content: req.body.content,
      position: [...req.body.position],
    };

    const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
    const newBoards = [board, ...boards];
    // console.log(newBoards, 'newBoards');
    const data = fs.writeFileSync('./backend/db/boards.json', JSON.stringify(newBoards));
    res.status(200).send('성공');
    // console.log('data', data);
  } catch (err) {
    res.status(400).send(err); // 이건머지
  }
});

module.exports = router;
