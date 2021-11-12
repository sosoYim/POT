const fs = require('fs');

const findUserByUserid = userid => {
  const users = JSON.parse(fs.readFileSync('./db/users.json'));
  return users.find(user => user.userid === userid);
};

const findUser = (userid, password) => {
  const users = JSON.parse(fs.readFileSync('./db/users.json'));
  users.find(user => user.userid === userid && user.password === password);
};

const registerUser = newUser => {
  const users = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  const newUsers = [...users, newUser];
  fs.writeFileSync('./backend/db/users.json', JSON.stringify(newUsers));
};

const getUsers = () => JSON.parse(fs.readFileSync('./db/users.json'));

module.exports = { findUserByUserid, findUser, registerUser, getUsers };
