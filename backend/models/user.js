const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Поле "email" должно быть валидным email-адресом',
    },
  },
  password: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
