// const fs = require('fs');
const router = require('express').Router();
const nodemailer = require('nodemailer');
// const run = require('../utils/nodemailer');
const dotenv = require('dotenv');
const {
  getUserEncIdList,
  getSummonerNameList,
  getRequestUserList,
  getParticipants,
  filterSoloRankTier,
  filterThreeMainChamp,
} = require('../query/manageQuery');

dotenv.config();

const summonerURL = 'https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/';
const championMasteriesURL = 'https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/';
const main = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to,
    subject,
    text,
  });

  console.log('Message sent: %s', info.messageId);
};

router.post('/mail', async (req, res) => {
  const { body } = req;
  await main(body).catch(console.error);
  res.send('Success');
});

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
