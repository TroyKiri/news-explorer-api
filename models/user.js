const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const NotCorrectDataError = require('../errors/not-correct-data-error');
const constant = require('../config/constant');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotCorrectDataError(constant.wrongEmailPassword));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotCorrectDataError(constant.wrongEmailPassword));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
