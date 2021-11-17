const jwt = require('jsonwebtoken');

/**
 * @description Restrict login and register when jwt token validate.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns {redirect} or @returns
 */
const authToLogin = (req, res, next) => {
  // Token set using headers or cookies
  const jwtToken = req.headers.authorization || req.cookies.jwtToken;

  try {
    const verified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    req.userId = verified.userId;
    return res.redirect('/');
  } catch (e) {
    next();
  }
};

/**
 * @description Verify jwt token validation.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns
 */
const auth = (req, res, next) => {
  // Token set using headers or cookies
  const jwtToken = req.headers.authorization || req.cookies.jwtToken;

  try {
    const verified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(`😀 사용자 인증 성공`, verified);
    req.userId = verified.userId;
    next();
  } catch (e) {
    console.error('😱 사용자 인증 실패..', e);
    // Not token or not valid
    return res.redirect('/login');
  }
};

module.exports = { authToLogin, auth };
