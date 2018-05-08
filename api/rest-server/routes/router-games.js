const router = require('express').Router();
const gamesController = require('../controllers/controller-games.js');

router.route('/:user_id').get(gamesController.fetchAllGames);
router.route('/').post(gamesController.fetchGame);
router.route('/challenge').post(gamesController.createGame);
router.route('/accept').put(gamesController.confirmGame);
router.route('/decline').delete(gamesController.deleteGame);
router.route('/update').put(gamesController.updateGame);
router.route('/save').put(gamesController.saveGame);

module.exports = router;