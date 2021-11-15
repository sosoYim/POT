const fs = require('fs');

const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));

const getBoardList = (currentPageNo, recordsPerPage) => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  const startIndex = (currentPageNo - 1) * recordsPerPage;

  return boards.filter((board, index) => index >= startIndex && index < startIndex + recordsPerPage);
};

/**
 *
 * @param {string} boardId
 * @returns
 */
const getBoardById = boardId => boards.find({ boardId });

/**
 * Add board in BOARD dataset
 * @param {object} newBoard
 */
const setBoard = newBoard => {
  const newBoardId = boards.length === 0 ? 1 : boards[0].boardId + 1;
  const regDate = new Date(+new Date() + 3240 * 10000).toISOString().replace('T', ' ').replace(/\..*/, '');

  const newBoards = [{ boardId: newBoardId, ...newBoard, regDate }, ...boards];
  fs.writeFileSync('./backend/db/boards.json', JSON.stringify(newBoards));

  return newBoardId;
};

module.exports = { getBoardList, getBoardById, setBoard };
