const mongoose = require('mongoose');
const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const NotCorrectDataError = require('../errors/not-correct-data-error');
const NotCorrectReqError = require('../errors/not-correct-req-error');
const constant = require('../config/constant');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send({
      article: {
        _id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      },
    }))
    .catch(next);
};

module.exports.deleteArticleId = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.articleId)) {
    return Article.findById(req.params.articleId).select('+owner')
      .orFail(() => { throw new NotFoundError(constant.noArticleId); })
      .then((article) => {
        if (article.owner.toString() === req.user._id) {
          Article.deleteOne(article)
            .then(() => res.send({
              article: {
                keyword: article.keyword,
                title: article.title,
                text: article.text,
                date: article.date,
                source: article.source,
                link: article.link,
                image: article.image,
              },
            }));
        } else {
          throw new NotCorrectDataError(constant.notCorrectDataError);
        }
      })
      .catch((err) => next(err));
  }
  const err = new NotCorrectReqError(constant.notCorrectReqError);
  return next(err);
};
