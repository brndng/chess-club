const models = require('../../db/models.js');
const sequelize = require('sequelize');

module.exports = {
  fetchAllGames: async (req, res) => {
    res.send('hello from gamesController')
  },
  fetchGame: async (req, res) => {
    res.send('hello from gamesController')
  },
  createGame: async (req, res) => {
    res.send('hello from gamesController')
  },
  confirmGame: async (req, res) => {
    res.send('hello from gamesController')
  },
  deleteGame: async (req, res) => {
    res.send('hello from gamesController')
  },
} 