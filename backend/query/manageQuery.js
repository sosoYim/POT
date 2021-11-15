const fs = require('fs');
const axios = require('axios');

// state
const soloRank = 'RANKED_SOLO_5x5';
const apiKey = 'RGAPI-134cbf55-d192-42b3-a3ce-d2ebc060ffa1';
const defaultInfo = { tier: 'UNRANK', rank: '' };

// helper
const getUserEncIdList = userIdList => {
  const userData = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  return userIdList.map(id => userData.find(({ userId }) => userId === +id).encryptedId);
};
const getSummonerNameList = encIdList => {
  const userData = JSON.parse(fs.readFileSync('./backend/db/users.json'));
  return encIdList.map(encId => userData.find(({ encryptedId }) => encryptedId === encId).summoner);
};
const getPositionList = (targetBoardId, userIdList) => {
  const requestData = JSON.parse(fs.readFileSync('./backend/db/requests.json'));
  return userIdList.map(
    id => requestData.find(({ userId, boardId }) => +id === userId && +targetBoardId === boardId).position
  );
};
const getParticipants = (encIdList, URL) => encIdList.map(encId => axios(URL + encId + '?api_key=' + apiKey));
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
  getUserEncIdList,
  getSummonerNameList,
  getPositionList,
  getParticipants,
  filterSoloRankTier,
  filterThreeMainChamp,
};
