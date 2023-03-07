const router = require('express').Router();
const { getUsers, createUser, getCurrentUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, getUsers);

router.post('/', createUser);
router.get('/me', getCurrentUser);

module.exports = router;
