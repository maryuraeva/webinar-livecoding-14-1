const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../config');

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
  const { identifier, password } = req.body;

  User
    .findOne({ username: identifier })
    .orFail(() => res.status(404).send({ message: 'Пользователь не найден' }))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      return res.status(404).send({ message: 'Пользователь не найден' });
    }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ user, jwt });
    })
    .catch(next);
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  // TODO: check token, getUser from DB, return username and email

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;
  const jwt = authorization.replace('Bearer ', '');
  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
  }

  User
    .findById(payload._id)
    .orFail(() => res.status(404).send({ message: 'Пользователь не найден' }))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers, createUser, login, getCurrentUser,
};
