const fs = require('fs');

/**
 * Find user by account in user database and return user.
 * @param {string} account
 * @returns {object} - user data
 */
const findUserByAccount = account =>
  JSON.parse(fs.readFileSync('./backend/db/users.json')).find(user => user.account === account);

/**
 * Find user in user database.
 * @param {string} account
 * @param {string} password
 * @returns {boolean}
 */
const findUser = (account, password) =>
  JSON.parse(fs.readFileSync('./backend/db/users.json')).find(
    user => user.account === account && user.password === password
  );

/**
 * Register user in user database.
 * @param {object} newUser
 */
const registerUser = newUser => {
  const users = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  const newUsers = [{ userId: users.length === 0 ? 1 : users[0].userId + 1, ...newUser }, ...users];
  fs.writeFileSync('./backend/db/users.json', JSON.stringify(newUsers));
};

/**
 * Get all users in user database.
 * @returns {array} - users array
 */
const getUsers = () => JSON.parse(fs.readFileSync('./backend/db/users.json'));

module.exports = { findUserByAccount, findUser, registerUser, getUsers };
