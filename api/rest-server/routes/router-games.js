const router = require('express').Router();
const gamesController = require('../controllers/controller-games.js');

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send('No hacks allowed. You must be logged in to do that.');
  }
}

router.route('/:id').get(isAuthenticated, gamesController.fetchGame);
router.route('/all/:user_id').get(isAuthenticated, gamesController.fetchAllGames);
router.route('/challenge').post(isAuthenticated, gamesController.createGame);
router.route('/move').put(isAuthenticated, gamesController.registerMove);
router.route('/check').put(isAuthenticated, gamesController.updateCheck);
router.route('/document').put(isAuthenticated, gamesController.documentGame); //
router.route('/resign').put(isAuthenticated, gamesController.resign);
router.route('/draw/offer').put(isAuthenticated, gamesController.registerDrawOffer);
router.route('/draw/accept').put(isAuthenticated, gamesController.acceptDraw);

module.exports = router;
