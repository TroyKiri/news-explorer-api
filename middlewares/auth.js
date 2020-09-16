const jwt = require('jsonwebtoken');
const secretKey = require('../secret_key/secretKey');
const NotCorrectDataError = require('../errors/not-correct-data-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new NotCorrectDataError('Необходима авторизация');
    return next(err);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (e) {
    const err = new NotCorrectDataError('Необходима авторизация');
    return next(err);
  }

  req.user = payload;

  return next();
};
