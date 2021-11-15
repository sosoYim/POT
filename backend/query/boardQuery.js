const fs = require('fs');

const getBoardList = (currentPageNo, recordsPerPage) => {
  const boards = JSON.parse(fs.readFileSync('./backend/db/boards.json'));
  const startIndex = (currentPageNo - 1) * recordsPerPage;

  return boards.filter((board, index) => index >= startIndex && index < startIndex + recordsPerPage);
};

module.exports = { getBoardList };
