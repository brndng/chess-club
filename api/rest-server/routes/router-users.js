const router = require('express').Router();
const usersController = require('../controllers/controller-users.js');

router.route('/signup').post(usersController.registerUser);
router.route('/login').post(usersController.authenticateUser);
router.route('/logout').get(usersController.terminateSession);
router.route('/profile/:id').get(usersController.fetchProfile);
router.route('/current').get(usersController.fetchCurrentUser);
router.route('/players').get(usersController.fetchPlayers);

module.exports = router;
