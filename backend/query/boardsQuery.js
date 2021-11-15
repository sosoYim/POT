const fs = require('fs');

const getBoardData = boardId => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  return boards.find(board => board.boardId === +boardId);
};

// 수정
const patchCompletedBoardData = (boardId, userId, completed) => {
  const requests = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  const newRequests = requests.map(request =>
    +request.userId === +userId && +request.boardId === +boardId ? { ...request, completed } : request
  );

  fs.writeFileSync('./backend/db/requests.json', JSON.stringify(newRequests));
};

module.exports = { getBoardData, patchCompletedBoardData };
