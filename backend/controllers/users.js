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

  User.create({ username, email, password })
    .then((user) => res.send(user))
    .catch(next);
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
