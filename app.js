// Подключение Express
const express = require('express');
// Подключение ODM Mongoose
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

// Подключение к серверу mongo
mongoose.connect('mongodb://localhost:27017/newsexplorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => console.log(`Порт запущенного сервера: ${PORT}`));
