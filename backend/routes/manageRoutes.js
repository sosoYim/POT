// const fs = require('fs');
const router = require('express').Router();
const {
  getUserEncIdList,
  getSummonerNameList,
  getRequestUserList,
  getParticipants,
  filterSoloRankTier,
  filterThreeMainChamp,
} = require('../query/manageQuery');

const summonerURL = 'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/';
const championMasteriesURL = 'https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/';

router.get('/:ids', async (req, res) => {
  const boardId = req.path.replace(/[/]|=.+/g, '');
  const userIdList = req.path.replace(/.+(=)/g, '').split(',');
  const encIdList = getUserEncIdList(userIdList);
  const summonerNameList = getSummonerNameList(encIdList);
  const requestUserList = getRequestUserList(boardId, userIdList);
  const participantList = await Promise.all(getParticipants(encIdList, summonerURL)).then(filterSoloRankTier);
  const mainChampList = await Promise.all(getParticipants(encIdList, championMasteriesURL)).then(filterThreeMainChamp);

  res.send(
    participantList.map((participant, i) => ({
      userId: userIdList[i],
      summoner: summonerNameList[i],
      mainChamp: mainChampList[i],
      order: requestUserList[i].requestId,
      position: requestUserList[i].position,
      completed: requestUserList[i].completed,
      ...participant,
    }))
  );
});

module.exports = router;
