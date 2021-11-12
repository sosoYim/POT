const fs = require('fs');

const findUserByAccount = account =>
  JSON.parse(fs.readFileSync('./backend/db/users.json')).find(user => user.account === account);

const findUser = (account, password) =>
  JSON.parse(fs.readFileSync('./backend/db/users.json')).find(
    user => user.account === account && user.password === password
  );

const registerUser = newUser => {
  const users = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  const newUsers = [{ userId: users.length === 0 ? 1 : users[0].userId + 1, ...newUser }, ...users];
  fs.writeFileSync('./backend/db/users.json', JSON.stringify(newUsers));
};

const getUsers = () => JSON.parse(fs.readFileSync('./backend/db/users.json'));

module.exports = { findUserByAccount, findUser, registerUser, getUsers };
