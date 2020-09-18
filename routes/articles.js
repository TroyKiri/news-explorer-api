// создаём роутер
const routerArticle = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, createArticle, deleteArticleId } = require('../controllers/articles');
// возвращает все сохранённые пользователем статьи
routerArticle.get('/', getArticles);
// создаёт статью
routerArticle.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
    image: Joi.string().required().regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/),
  }),
}), createArticle);
// удаляет сохранённую статью  по _id
routerArticle.delete('/:articleId', deleteArticleId);

module.exports = routerArticle;
