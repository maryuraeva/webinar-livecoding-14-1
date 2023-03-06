const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
