const router = require('express').Router();
const usersController = require('../controllers/controller-users.js');
const passport = require('../passport');

router.route('/signup').post(usersController.registerUser);
router.route('/login').post(passport.authenticate('local'), usersController.verifyUser);
router.route('/logout').post(usersController.terminateSession);
router.route('/profile/:user_id').get(usersController.fetchProfile);
router.route('/:user_id').get(usersController.fetchUser);

module.exports = router;
