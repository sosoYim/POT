const fs = require('fs');

const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));

/**
 * Add board in BOARD dataset
 * @param {object} newBoard
 */
const setBoard = newBoard => {
  // 저장 후 추가된 id값 빼기 위해 뺌 : generateId(tableName) 으로 빼도 될 듯
  const newBoardId = boards.length === 0 ? 1 : boards[0].boardId + 1;
  const newBoards = [{ boardId: newBoardId, ...newBoard }, ...boards];
  fs.writeFileSync('./backend/db/boards.json', JSON.stringify(newBoards));

  return newBoardId;
};

module.exports = { setBoard };
