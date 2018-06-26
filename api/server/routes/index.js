const router = require('express').Router();
const usersRouter = require('./router-users.js');
const gamesRouter = require('./router-games.js');

router.use('/users', usersRouter);
router.use('/games', gamesRouter);

module.exports = router;
