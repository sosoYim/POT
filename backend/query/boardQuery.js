const fs = require('fs');

const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));

/**
 * Add board in BOARD dataset
 * @param {object} newBoard
 */
const setBoard = newBoard => {
  const newBoardId = boards.length === 0 ? 1 : boards[0].boardId + 1;
  const newBoards = [{ boardId: newBoardId, ...newBoard, regDate: new Date() }, ...boards];
  fs.writeFileSync('./backend/db/boards.json', JSON.stringify(newBoards));

  return newBoardId;
};

module.exports = { setBoard };
