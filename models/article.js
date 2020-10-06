const mongoose = require('mongoose');
const validator = require('validator');

// Схема для статей
const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: validator.isURL,
    required: true,
  },
  image: {
    type: String,
    validate: validator.isURL,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false,
  },
});

// экспорт и создание модели статьи
module.exports = mongoose.model('article', articleSchema);
