const router = require('express').Router();
const usersController = require('../controllers/controller-users.js');
const passport = require('../passport');

router.route('/signup').post(usersController.registerUser);
router.route('/login').post(passport.authenticate('local'), usersController.sendUserInfo);
router.route('/logout').post(usersController.terminateSession);
router.route('/profile/:id').get(usersController.fetchProfile);
router.route('/session').get(usersController.sendUserInfo);
router.route('/players').get(usersController.fetchPlayers)

module.exports = router;
