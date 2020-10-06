const jwt = require('jsonwebtoken');
const config = require('../config/config');
const NotCorrectDataError = require('../errors/not-correct-data-error');
const constant = require('../config/constant');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new NotCorrectDataError(constant.needAuth);
    return next(err);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, config.devSecret);
  } catch (e) {
    const err = new NotCorrectDataError(constant.needAuth);
    return next(err);
  }

  req.user = payload;

  return next();
};
