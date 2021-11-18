const jwt = require('jsonwebtoken');
const { getUserId } = require('../query/boardsQuery');

/**
 * @description Restrict login page and register page when jwt token validate.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns {redirect} ('/')
 */
const blockUserAuth = (req, res, next) => {
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
 * @description Redirect ('/') when jwt token expired.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns {redirect} ('/login')
 */
const blockGuestAuth = (req, res, next) => {
  // Token set using headers or cookies
  const jwtToken = req.headers.authorization || req.cookies.jwtToken;

  try {
    const verified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    req.userId = verified.userId;
    next();
  } catch (e) {
    return res.redirect('/login');
  }
};

/**
 * @description Return false for modal when jwt token expired.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns {boolean}
 */
const checkUserAuth = (req, res, next) => {
  // Token set using headers or cookies
  const jwtToken = req.headers.authorization || req.cookies.jwtToken;
  try {
    const verified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    console.log(`😀 사용자 인증 성공`, verified);

    req.userId = verified.userId;
    next();
  } catch (e) {
    console.error('😱 사용자 인증 실패..', e);
    req.userId = null;
    next();
  }
};

/**
 * @description Redirect ('/') when jwt token expired & not writer.
 * @param {request} req
 * @param {response} res
 * @param {next} next
 * @returns {boolean}
 */
const accessWriterAuth = (req, res, next) => {
  // Token set using headers or cookies
  const jwtToken = req.headers.authorization || req.cookies.jwtToken;

  try {
    const verified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    const boardId = +req.path.substring(req.path.lastIndexOf('/') + 1);

    if (!getUserId(boardId) || +verified.userId !== +getUserId(boardId)) res.redirect('/');

    console.log(`😀 사용자 인증 성공`, verified);
    next();
  } catch (e) {
    console.error('😱 사용자 인증 실패..', e);
    return res.redirect('/login');
  }
};

module.exports = { blockUserAuth, blockGuestAuth, checkUserAuth, accessWriterAuth };
