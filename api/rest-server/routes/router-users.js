const router = require('express').Router();
const usersController = require('../controllers/controller-users.js');

router.route('/signup').post(usersController.registerUser);
router.route('/login').post(usersController.verifyUser);
router.route('/logout').post(usersController.terminateSession);
router.route('/profile/:user_id').get(usersController.fetchProfile);
router.route('/:user_id').get(usersController.fetchUser);

module.exports = router;
