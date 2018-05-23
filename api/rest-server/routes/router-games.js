const router = require('express').Router();
const gamesController = require('../controllers/controller-games.js');

router.route('/:id').get(gamesController.fetchGame);
router.route('/all/:user_id').get(gamesController.fetchAllGames);
router.route('/challenge').post(gamesController.createGame);
router.route('/accept').put(gamesController.confirmGame);
router.route('/decline').delete(gamesController.deleteGame);
router.route('/move').put(gamesController.registerMove);
router.route('/check').put(gamesController.updateCheck);
router.route('/document').put(gamesController.documentGame);

module.exports = router;
