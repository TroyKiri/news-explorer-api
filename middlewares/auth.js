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
    const { NODE_ENV, JWT_SECRET } = process.env;
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : config.devSecret);
  } catch (e) {
    const err = new NotCorrectDataError(constant.needAuth);
    return next(err);
  }

  req.user = payload;

  return next();
};
