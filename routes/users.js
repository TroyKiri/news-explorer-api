// создаём роутер
const routerUser = require('express').Router();
const { getUser } = require('../controllers/users');
// возвращает информацию о пользователе
routerUser.get('/me', getUser);

module.exports = routerUser;
