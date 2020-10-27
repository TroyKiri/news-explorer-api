require('dotenv').config();
// подключение Express
const express = require('express');
const cors = require('cors');
// мидлвэр для объединения данных
const bodyParser = require('body-parser');
const helmet = require('helmet');
// подключение ODM Mongoose
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const routers = require('./routes/index');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./errors/error-handler');
const config = require('./config/config');
const limiter = require('./middlewares/rate-limiter');
const { ALLOWED_CORS } = require('./config/constant');

// определение порта в переменных окружения
const { PORT = 3000 } = process.env;
// создание приложения
const app = express();

app.use(helmet());

// подключаем rate-limiter
app.use(limiter);

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// подключение к серверу mongo
mongoose.connect(config.adressMongo, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(cors({
  origin: 'http://localhost:8080/',
  credentials: true,
}));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
app.post('/signup', createUser);
// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//     name: Joi.string().required().min(2).max(30),
//   }),
// }), createUser);

app.use('/users', auth, routers.routerUser);
app.use('/articles', auth, routers.routerArticle);
app.use('/', routers.invalidRout);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

// определение порта, с которого Node будет принимать сообщения
app.listen(PORT, () => console.log(`Порт запущенного сервера: ${PORT}`));
