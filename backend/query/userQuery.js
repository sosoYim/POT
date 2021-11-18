const fs = require('fs');

/**
 * @description Find user by email in user database and return user.
 * @param {string} email
 * @returns {object} - user data
 */
const findUserByEmail = email =>
  JSON.parse(fs.readFileSync('./backend/db/users.json')).find(user => user.email === email);

/**
 * @description Find user by id in user database and return user.
 * @param {number} id
 * @returns {object} - user data
 */
const findUserByID = id => JSON.parse(fs.readFileSync('./backend/db/users.json')).find(user => user.userId === id);

/**
 * @description Find user in user database.
 * @param {string} email
 * @param {string} password
 * @returns {boolean}
 */
const findUser = (email, password) =>
  JSON.parse(fs.readFileSync('./backend/db/users.json')).find(
    user => user.email === email && user.password === password
  );

/**
 * @description Register user in user database.
 * @param {object} newUser
 */
const registerUser = newUser => {
  const users = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  const newUsers = [{ userId: users.length === 0 ? 1 : users[0].userId + 1, ...newUser }, ...users];
  fs.writeFileSync('./backend/db/users.json', JSON.stringify(newUsers));
};

/**
 * @description Get all users in user database.
 * @returns {array} - users array
 */
const getUsers = () => JSON.parse(fs.readFileSync('./backend/db/users.json'));

/**
 * @description Update username and encryptedId.
 * @param {number} userId
 * @param {string} summoner
 */
const updateUserSummoner = (userId, summoner, encryptedId) => {
  const users = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  const index = users.findIndex(user => user.userId === userId);
  users[index].summoner = summoner;
  users[index].encryptedId = encryptedId;
  fs.writeFileSync('./backend/db/users.json', JSON.stringify(users));
};

/**
 * @description Find encryptedId by userId
 * @param {number} userId
 * @param {string} encryptedId
 */
const getUserEncId = findUserId => {
  const userData = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  return userData.find(({ userId }) => userId === +findUserId).encryptedId;
};
/**
 * @description Find sommenerName by encryptedId
 * @param {number} envryptedId
 * @param {string} summoner;
 */
const getSummonerName = encId => {
  const userData = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  return userData.find(({ encryptedId }) => encryptedId === encId).summoner;
};

module.exports = {
  findUserByEmail,
  findUser,
  registerUser,
  getUsers,
  updateUserSummoner,
  getUserEncId,
  getSummonerName,
};
