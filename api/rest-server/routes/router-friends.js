const router = require('express').Router();
const friendsController = require('../controllers/controller-friends.js');

router.route('/').get(friendsController.fetchAllFriends);
router.route('/request').post(friendsController.createFriend);
router.route('/accept').put(friendsController.confirmFriend);
router.route('/decline').delete(friendsController.deleteFriend);

module.exports = router;
