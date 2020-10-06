const constant = require('../config/constant');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? constant.serverError : err.message;
  res.status(statusCode).send({ message });
};
