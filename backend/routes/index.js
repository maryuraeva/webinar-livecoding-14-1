const router = require('express').Router();

const userRouter = require('./users');

router.use('/users', userRouter);

router.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

module.exports = router;
