// создаём роутер
const invalidRouter = require('express').Router();
const NotFoundError = require('../errors/not-found-error');
const constant = require('../config/constant');
// возвращает сообщение "Запрашиваемый ресурс не найден"
invalidRouter.all('*', (req, res, next) => {
  const err = new NotFoundError(constant.notFoundError);
  next(err);
});

module.exports = invalidRouter;
