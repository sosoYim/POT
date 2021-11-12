const jwt = require('jsonwebtoken');

/**
 * Verify jwt token validation.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns
 */
const auth = (req, res, next) => {
  // Token set using headers or cookies
  const accessToken = req.headers.jwtToken || req.cookies.jwtToken;

  try {
    const verified = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    console.log(`😀 사용자 인증 성공`, verified);
    next();
  } catch (e) {
    console.error('😱 사용자 인증 실패..', e);
    // Not token or not valid
    return res.send(false);
  }
};

module.exports.auth = auth;
