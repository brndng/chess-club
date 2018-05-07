const router = require('express').Router();
const gamesController = require('../controllers/controller-games.js');

router.route('/').get(gamesController.fetchAllGames);
router.route('/:game_id').get(gamesController.fetchGame);
router.route('/challenge').post(gamesController.createGame);
router.route('/accept').put(gamesController.confirmGame);
router.route('/decline').delete(gamesController.deleteGame);

module.exports = router;