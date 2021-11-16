const fs = require('fs');

const isMyRequest = (userId, boardId) => {
  const requests = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  return requests.some(request => +request.userId === +userId && +request.boardId === +boardId);
};

const setRequest = newRequest => {
  const requests = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  const newRequestId = requests.length === 0 ? 1 : requests[0].requestId + 1;
  const newRequests = [{ requestId: newRequestId, ...newRequest, completed: false }, ...requests];
  fs.writeFileSync('./backend/db/requests.json', JSON.stringify(newRequests));
  return newRequestId;
};

module.exports = { isMyRequest, setRequest };
