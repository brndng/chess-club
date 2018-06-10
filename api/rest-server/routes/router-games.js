const router = require('express').Router();
const gamesController = require('../controllers/controller-games.js');

const isAuthenticated = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('No hacks allowed.');
  }
}

router.route('/:id').get(isAuthenticated, gamesController.fetchGame);
router.route('/all/:user_id').get(isAuthenticated, gamesController.fetchAllGames);
router.route('/challenge').post(isAuthenticated, gamesController.createGame);
router.route('/accept').put(isAuthenticated, gamesController.confirmGame);//
router.route('/decline').delete(isAuthenticated, gamesController.deleteGame);//
router.route('/move').put(isAuthenticated, gamesController.registerMove);
router.route('/check').put(isAuthenticated, gamesController.updateCheck);
router.route('/document').put(isAuthenticated, gamesController.documentGame);

module.exports = router;
