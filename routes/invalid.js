const invalidRouter = require('express').Router();
const NotFoundError = require('../errors/not-found-error');

invalidRouter.all('*', (req, res, next) => {
  const err = new NotFoundError('Запрашиваемый ресурс не найден');
  next(err);
});

module.exports = invalidRouter;
