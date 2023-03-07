const router = require('express').Router();
const { getUsers, createUser, getCurrentUser } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/me', getCurrentUser);

module.exports = router;
