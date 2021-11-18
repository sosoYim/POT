const axios = require('axios');
const router = require('express').Router();

const URL = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';
const apiKey = process.env.API_KEY;

/**
 * @description Router for checking summoner name.
 * @returns {data} if exists, @returns {boolean} if not exists.
 */
router.post('/summoner', async (req, res) => {
  const { summoner } = req.body;

  try {
    const { data } = await axios.get(URL + encodeURI(summoner) + '?api_key=' + apiKey);
    res.send(data);
  } catch (err) {
    res.send(false);
  }
});

module.exports = router;
