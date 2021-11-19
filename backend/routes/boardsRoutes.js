const router = require('express').Router();
const {
  getBoardData,
  getUserIdList,
  patchCompletedBoardUser,
  patchCompletedBoardData,
  patchParticipantPosition,
  getBoardList,
  insertBoard,
  getCreatedPot,
  getAppliedPot,
} = require('../query/boardsQuery');
const { isMyRequest, setRequest, getApply } = require('../query/requestsQuery');
const { getUserEncIdList, getSummonerNameList, getParticipants, filterSoloRankTier } = require('../query/manageQuery');
const { blockGuestAuth, checkUserAuth } = require('../utils/verifyToken');
const { getUserEncId, getSummonerName } = require('../query/userQuery');

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

router.get('/list/created', blockGuestAuth, async (req, res) => {
  const createdPot = getCreatedPot(req.userId);
  const userNoList = createdPot.map(board => board.userId);
  const encIdList = getUserEncIdList(userNoList);
  const summonerNameList = getSummonerNameList(encIdList);
  const participantList = await Promise.all(getParticipants(encIdList, summonerURL)).then(filterSoloRankTier);
  const response = createdPot.map((pot, index) => ({
    ...pot,
    summoner: summonerNameList[index],
    tier: participantList[index].tier,
  }));

  res.send(response);
});

router.get('/list/applied', blockGuestAuth, async (req, res) => {
  const apply = getApply(req.userId);
  const boardNoList = apply.map(apply => apply.boardId);
  const appliedPot = getAppliedPot(boardNoList);
  const userNoList = appliedPot.map(board => board.userId);
  const encIdList = getUserEncIdList(userNoList);
  const summonerNameList = getSummonerNameList(encIdList);
  const participantList = await Promise.all(getParticipants(encIdList, summonerURL)).then(filterSoloRankTier);
  const response = appliedPot.map((pot, index) => ({
    ...pot,
    summoner: summonerNameList[index],
    tier: participantList[index].tier,
  }));

  res.send(response);
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

router.get('/detail/:id', checkUserAuth, async (req, res) => {
  const { userId } = req;
  const boardId = req.path.replace('/detail/', '');
  const board = getBoardData(boardId);

  const encId = getUserEncId(+board.userId); // 작성자
  const summonerName = getSummonerName(encId);
  board.summonerName = summonerName;

  const [{ tier }] = await Promise.all(getParticipants([encId], summonerURL)).then(filterSoloRankTier);
  board.tier = tier;

  const myRequest = isMyRequest(userId, boardId);

  // const participantList = await Promise.all(getParticipants(encIdList, summonerURL)).then(filterSoloRankTier);

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

router.patch('/participant/userid/:id', (req, res) => {
  const {
    body: { completed },
    path,
  } = req;
  const [boardId, userId] = path.replace('/participant/userid/', '').split('=');
  patchCompletedBoardUser(boardId, userId, completed);
  res.send();
});

router.patch('/participant/position/:position', (req, res) => {
  const {
    body: { completed },
    path,
  } = req;
  const [boardId, position] = path.replace('/participant/position/', '').split('=');
  patchCompletedBoardData(boardId, position, completed);
  res.send();
});

router.patch('/position/:id', (req, res) => {
  const {
    path,
    body: { position },
  } = req;
  const [boardId, userId] = path.replace('/position/', '').split('=');
  console.log(boardId, userId, position);
  // patchCompletedBoardData(boardId, userId, completed);
  patchParticipantPosition(boardId, userId, position);
  res.send();
});

module.exports = router;
