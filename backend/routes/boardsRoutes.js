const router = require('express').Router();
const {
  getBoardData,
  getUserIdList,
  patchCompletedBoardData,
  patchParticipantPosition,
  getBoardList,
  insertBoard,
} = require('../query/boardsQuery');
const { isMyRequest, setRequest } = require('../query/requestsQuery');
const { getUserEncIdList, getSummonerNameList, getParticipants, filterSoloRankTier } = require('../query/manageQuery');
const { blockGuestAuth, checkUserAuth } = require('../utils/verifyToken');

const summonerURL = 'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/';

router.get('/list', async (req, res) => {
  const { type, position, currentPageNo, recordsPerPage } = req.query;
  const boards = getBoardList(type, position, +currentPageNo, +recordsPerPage);
  const userNoList = boards.map(board => board.userId);
  const encIdList = getUserEncIdList(userNoList);
  const summonerNameList = getSummonerNameList(encIdList);
  const participantList = await Promise.all(getParticipants(encIdList, summonerURL)).then(filterSoloRankTier);
  const response = boards.map((board, index) => ({
    ...board,
    summoner: summonerNameList[index],
    tier: participantList[index].tier,
  }));

  res.send(response);
});

router.get('/list/createdpot', blockGuestAuth, (req, res) => {
  console.log(req.userId);
  res.send(true);
});

router.post('/', blockGuestAuth, (req, res) => {
  const { type, title } = req.body;
  let { content, position } = req.body;
  const userId = +req.userId;
  content = JSON.parse(content);
  position = JSON.parse(position);
  const board = { userId, type, title, content, position };

  const boardId = insertBoard(board);
  res.status(200).send(boardId + '');
});

router.get('/detail/:id', checkUserAuth, (req, res) => {
  const { userId } = req;
  const boardId = req.path.replace('/detail/', '');
  const board = getBoardData(boardId);
  const myRequest = isMyRequest(userId, boardId);
  res.send({ board, myRequest, userId });
});

router.post('/detail', checkUserAuth, (req, res) => {
  const userId = +req.userId;
  // TODO: 로그인 안된 상태면 로그인 모달 필요
  const { boardId, position } = req.body;
  const request = { boardId: +boardId, userId: +userId, position };
  const requestId = setRequest(request);
  res.send(requestId + '');
});

router.get('/manage/:id', (req, res) => {
  console.log(req.userId);
  const boardId = req.path.replace('/manage/', '');
  const { title, position } = getBoardData(boardId);
  const userIdList = getUserIdList(boardId);
  console.log(userIdList);
  res.send({ title, position, userIdList });
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

router.patch('/position/:id', (req, res) => {
  const {
    path,
    body: { position },
  } = req;
  const [boardId, userId] = path.replace('/position/', '').split('=');
  // patchCompletedBoardData(boardId, userId, completed);
  patchParticipantPosition(boardId, userId, position);
  res.send();
});

module.exports = router;
