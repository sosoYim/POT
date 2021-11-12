const router = require('express').Router();

router.post('/register', (req, res) => {
  res.send('Register');
});

module.exports = router;

// const jwt = require('jsonwebtoken');
// const users = require('../model/users');

// router.post('/register', (req, res) => {});

// router.post('/signin', (req, res) => {
//   const { userid, password } = req.body;

//   console.log(req.body);

//   // 401 Unauthorized
//   if (!userid || !password)
//     return res.status(401).send({ error: '사용자 아이디 또는 패스워드가 전달되지 않았습니다.' });

//   const user = users.findUser(userid, password);
//   console.log('사용자 정보:', user);

//   // 401 Unauthorized
//   if (!user) return res.status(401).send({ error: '등록되지 않은 사용자입니다.' });

//   // 토큰 생성
//   const accessToken = jwt.sign({ userid }, process.env.JWT_SECRET_KEY, {
//     expiresIn: '1d',
//   });

//   // 쿠키에 토큰 설정(http://expressjs.com/ko/api.html#res.cookie)
//   res.cookie('accessToken', accessToken, {
//     maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
//     httpOnly: true,
//   });

//   // 로그인 성공
//   res.send({ userid, encryptedId: user.encryptedId });
// });
