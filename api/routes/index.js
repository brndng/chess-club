const router = require('express').Router();
const usersRouter = require('./users.js');
const gamesRouter = require('./games.js');

router.use('/users', usersRouter);
router.use('/games', gamesRouter);

module.exports = router;
