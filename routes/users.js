const routerUser = require('express').Router();
const { getUser } = require('../controllers/users');

routerUser.get('/me', getUser);

module.exports = routerUser;
