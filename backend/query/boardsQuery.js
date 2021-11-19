const fs = require('fs');
const { lastIndexOf } = require('lodash');

const getBoardData = boardId => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  return boards.find(board => board.boardId === +boardId);
};

const getUserId = boardId => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  return boards.find(board => +board.boardId === +boardId).userId;
};

const getUserIdList = boardId => {
  const requests = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  return requests.filter(request => request.boardId === +boardId).map(({ userId }) => userId);
};

const patchCompletedBoardData = (boardId, position, completed) => {
  const requests = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  const newRequests = requests.map(request =>
    +request.boardId === +boardId && request.position === position ? { ...request, completed } : request
  );

  fs.writeFileSync('./backend/db/requests.json', JSON.stringify(newRequests));
};
const patchCompletedBoardUser = (boardId, userId, completed) => {
  const requests = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  const newRequests = requests.map(request =>
    +request.boardId === +boardId && +request.userId === +userId ? { ...request, completed } : request
  );

  fs.writeFileSync('./backend/db/requests.json', JSON.stringify(newRequests));
};

const patchParticipantPosition = (boardId, userId, position) => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  const newBoards = boards.map(board => {
    console.log({ ...board.position, [position]: false });
    console.log(+board.boardId === +boardId);
    return +board.boardId === +boardId ? { ...board, position: { ...board.position, [position]: false } } : board;
  });
  fs.writeFileSync('./backend/db/boards.json', JSON.stringify(newBoards));
};

const getBoardList = (type, position, currentPageNo, recordsPerPage) => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  const startIndex = (currentPageNo - 1) * recordsPerPage;

  return boards
    .filter(board => board.type === type)
    .filter(board => (position === 'all' ? true : board.position[position]))
    .filter((board, index) => index >= startIndex && index < startIndex + recordsPerPage);
};

/**
 * Add board in BOARD dataset
 * @param {object} newBoard
 */
const insertBoard = newBoard => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  const newBoardId = boards.length === 0 ? 1 : boards[0].boardId + 1;
  let regDate = new Date(+new Date() + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, '');
  regDate = regDate.substring(0, regDate.lastIndexOf(':'));

  const newBoards = [{ boardId: newBoardId, ...newBoard, regDate }, ...boards];
  fs.writeFileSync('./backend/db/boards.json', JSON.stringify(newBoards));

  return newBoardId;
};

const getCreatedPot = userId => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));

  return boards.filter(board => board.userId === userId);
};

const getAppliedPot = boardNoList => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));

  return boardNoList.map(boardNo => boards.find(board => board.boardId === boardNo));
};

module.exports = {
  getBoardData,
  getUserId,
  getUserIdList,
  patchCompletedBoardUser,
  patchCompletedBoardData,
  patchParticipantPosition,
  getBoardList,
  insertBoard,
  getCreatedPot,
  getAppliedPot,
};
