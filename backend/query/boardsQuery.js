const fs = require('fs');

const getBoardData = boardId => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  return boards.find(board => board.boardId === +boardId);
};

const patchCompletedBoardData = (boardId, userId, completed) => {
  const requests = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  const newRequests = requests.map(request =>
    +request.userId === +userId && +request.boardId === +boardId ? { ...request, completed } : request
  );

  fs.writeFileSync('./backend/db/requests.json', JSON.stringify(newRequests));
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
const setBoard = newBoard => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  const newBoardId = boards.length === 0 ? 1 : boards[0].boardId + 1;
  const regDate = new Date(+new Date() + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, '');

  const newBoards = [{ boardId: newBoardId, ...newBoard, regDate }, ...boards];
  fs.writeFileSync('./backend/db/boards.json', JSON.stringify(newBoards));

  return newBoardId;
};

module.exports = { getBoardData, patchCompletedBoardData, getBoardList, setBoard };
