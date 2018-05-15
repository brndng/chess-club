const router = require('express').Router();
const usersRouter = require('./router-users.js');
const friendsRouter = require('./router-friends.js');
const gamesRouter = require('./router-games.js');

router.use('/users', usersRouter);
router.use('/friends', friendsRouter);
router.use('/games', gamesRouter);

module.exports = router;