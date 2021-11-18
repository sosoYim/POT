const router = require('express').Router();
const { auth } = require('../utils/verifyToken');
const {
  getBoardData,
  getUserIdList,
  patchCompletedBoardData,
  patchParticipantPosition,
  getBoardList,
  setBoard,
} = require('../query/boardsQuery');
const { isMyRequest, setRequest } = require('../query/requestsQuery');
const { getUserEncIdList, getSummonerNameList, getParticipants, filterSoloRankTier } = require('../query/manageQuery');
const { auth } = require('../utils/verifyToken');

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

router.post('/', (req, res) => {
  const { type, title } = req.body;
  let { userId, content, position } = req.body;
  userId = +userId;
  content = JSON.parse(content);
  position = JSON.parse(position);
  const board = { userId, type, title, content, position };

  const boardId = setBoard(board);
  res.status(200).send(boardId + '');
});

router.get('/detail/:id', (req, res) => {
  // console.log(req.userId);
  const userId = 3;
  const boardId = req.path.replace('/detail/', '');
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
