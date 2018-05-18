const { Op } = require('sequelize');
const models = require('../../db/models.js');

module.exports = {
  fetchAllFriends: async (req, res) => {
    res.send('hello from friendsController');
  },
  createFriend: async (req, res) => {
    res.send('hello from friendsController');
  },
  confirmFriend: async (req, res) => {
    res.send('hello from friendsController');
  },
  deleteFriend: async (req, res) => {
    res.send('hello from friendsController');
  },
};
