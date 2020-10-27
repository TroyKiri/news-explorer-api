const serverError = 'На сервере произошла ошибка';
const noUniqueEmail = 'Пользователь с таким email уже зарегистрирован';
const notCorrectReqError = 'К сожалению, это неверный формат id статьи';
const notCorrectDataError = 'Вы не можете удалять чужие статьи';
const noArticleId = 'Статьи с таким id нет';
const needAuth = 'Необходима авторизация';
const wrongEmailPassword = 'Неправильные почта и пароль';
const notFoundError = 'Запрашиваемый ресурс не найден';

module.exports = {
  serverError,
  noUniqueEmail,
  notCorrectReqError,
  notCorrectDataError,
  noArticleId,
  needAuth,
  wrongEmailPassword,
  notFoundError,
};
module.exports.ALLOWED_CORS = [
  'https://news-explorer-app.ml',
  'http://news-explorer-app.ml',
  'http://localhost:8080',
  'http://localhost:4200',
  'https://troykiri.github.io',
  'http://troykiri.github.io',
];
