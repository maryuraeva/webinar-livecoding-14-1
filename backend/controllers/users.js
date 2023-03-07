const bcrypt = require('bcrypt');

const User = require('../models/user');

// GET /users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// POST /auth/local/register
const createUser = (req, res, next) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ username, email, password: hash }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).send({ message: 'Пользователь с такими данными уже существует' });
      } else {
        next(err);
      }
    });
};

// POST /auth/local
const login = (req, res, next) => {
  res.status(200).send({ message: 'login ok' });
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  res.status(200).send({ message: 'getCurrentUser ok' });
};

module.exports = {
  getUsers, createUser, login, getCurrentUser,
};
