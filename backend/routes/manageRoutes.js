// const fs = require('fs');
const router = require('express').Router();
const dotenv = require('dotenv');
const sendmail = require('../utils/sendmail');
const auth = require('../utils/verifyToken');
const {
  getUserInfoList,
  getUserEncIdList,
  getRequestUserList,
  getParticipants,
  filterSoloRankTier,
  filterThreeMainChamp,
} = require('../query/manageQuery');

dotenv.config();

const summonerURL = 'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/';
const championMasteriesURL = 'https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/';

router.get('/check', (req, res) => {
  console.log(req.body);
});

router.post('/mail', async (req, res) => {
  const { body } = req;

  try {
    await sendmail(body);
    res.send({ sendMail: true, content: '메일을 성공적으로 전송했습니다.' });
  } catch (err) {
    res.send({ sendMail: false, content: '메일전송에 실패했습니다.' });
  }
});

router.get('/participants/:ids', async (req, res) => {
  const boardId = req.path.replace(/[/participants/]|=.+/g, '');
  const userIdList = req.path.replace(/.+(=)/g, '').split(',');
  const userInfoList = getUserInfoList(userIdList);
  const encIdList = getUserEncIdList(userIdList);
  const requestUserList = getRequestUserList(boardId, userIdList);

  const participantList = await Promise.all(getParticipants(encIdList, summonerURL)).then(filterSoloRankTier);
  const mainChampList = await Promise.all(getParticipants(encIdList, championMasteriesURL)).then(filterThreeMainChamp);

  res.send(
    participantList.map((participant, i) => ({
      userId: userInfoList[i].userId,
      email: userInfoList[i].email,
      summoner: userInfoList[i].summoner,
      mainChamp: mainChampList[i],
      order: requestUserList[i].requestId,
      position: requestUserList[i].position,
      completed: requestUserList[i].completed,
      ...participant,
    }))
  );
});

module.exports = router;
