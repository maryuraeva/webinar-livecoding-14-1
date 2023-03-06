const User = require('../models/user');

// GET /users
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// POST /users
const createUser = (req, res, next) => {
  const { username, email, password } = req.body;

  User.create({ username, email, password })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers, createUser,
};
