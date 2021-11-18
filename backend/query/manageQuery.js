const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

// state
const soloRank = 'RANKED_SOLO_5x5';
const defaultInfo = { tier: 'UNRANK', rank: '' };

// helper
const getUserInfoList = userIdList => {
  const userData = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  return userIdList.map(id => userData.find(({ userId }) => userId === +id));
};
const getSummonerNameList = encIdList => {
  const userData = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  return encIdList.map(encId => userData.find(({ encryptedId }) => encryptedId === encId).summoner);
};
const getUserEncIdList = userIdList => {
  const userData = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  return userIdList.map(id => userData.find(({ userId }) => userId === +id).encryptedId);
};

const getPositionList = (targetBoardId, userIdList) => {
  const requestData = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  return userIdList.map(
    id => requestData.find(({ userId, boardId }) => +id === userId && +targetBoardId === boardId).position
  );
};

const getRequestOrderList = (targetBoardId, userIdList) => {
  const requestData = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  return userIdList.map(
    id => requestData.find(({ userId, boardId }) => +id === userId && +targetBoardId === boardId).requestId
  );
};

const getRequestUserList = (targetBoardId, userIdList) => {
  const requestData = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  return userIdList.map(id => {
    const { requestId, position, completed } = requestData.find(
      ({ userId, boardId }) => +id === userId && +targetBoardId === boardId
    );
    return { requestId, position, completed };
  });
};

const getParticipants = (encIdList, URL) =>
  encIdList.map(encId => axios(URL + encId + '?api_key=' + process.env.API_KEY));

const filterSoloRankTier = res =>
  res.map(({ data }) => {
    const { tier, rank } = data.filter(({ queueType }) => queueType === soloRank)[0] || defaultInfo;
    return { tier, rank };
  });

const filterThreeMainChamp = res => {
  const champData = JSON.parse(fs.readFileSync('./backend/db/champs.json'));

  return res.map(({ data: [one, two, three] }) => [
    champData[one.championId],
    champData[two.championId],
    champData[three.championId],
  ]);
};

module.exports = {
  getUserInfoList,
  getSummonerNameList,
  getUserEncIdList,
  getPositionList,
  getRequestOrderList,
  getRequestUserList,
  getParticipants,
  filterSoloRankTier,
  filterThreeMainChamp,
};
