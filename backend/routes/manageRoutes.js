// const fs = require('fs');
const router = require('express').Router();
const {
  getUserEncIdList,
  getSummonerNameList,
  getPositionList,
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
  const positionList = getPositionList(boardId, userIdList);
  const participantList = await Promise.all(getParticipants(encIdList, summonerURL)).then(filterSoloRankTier);
  const mainChampList = await Promise.all(getParticipants(encIdList, championMasteriesURL)).then(filterThreeMainChamp);

  res.send(
    participantList.map((participant, i) => ({
      summoner: summonerNameList[i],
      mainChamp: mainChampList[i],
      position: positionList[i],
      ...participant,
    }))
  );
});

module.exports = router;
