const router = require('express').Router();

const userRouter = require('./users');
const { login, createUser } = require('../controllers/users');

router.post('/auth/local/register', createUser);
router.post('/auth/local', login);

router.use('/users', userRouter);

router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = router;
