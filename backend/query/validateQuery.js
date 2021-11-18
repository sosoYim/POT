const fs = require('fs');

const getSummoner = userId => {
  const users = JSON.parse(fs.readFileSync('./backend/db/users.json'));

  return users.find(user => user.userId === userId).summoner;
};

module.exports = { getSummoner };
