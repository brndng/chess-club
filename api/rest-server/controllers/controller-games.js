const { Op } = require('sequelize');
const db = require('../../db/models.js');

module.exports = {
  fetchAllGames: async (req, res) => {
    const { user_id } = req.params;
    try {
      const games = await db.Game.findAll({ 
        where: {
          [Op.or]: [{ white: user_id }, { black: user_id }],
        },
      });
      res.send(games.map(game => game.dataValues));
    } catch (err) {
      console.log('err from fetchAllGames', err);
    }
  },
  fetchGame: async (req, res) => {
    const { id } = req.params;
    try {
      const game = await db.Game.findOne({ where: { id } });
      res.send(game);
    } catch (err) {
      console.log('err from fetchGame', err);
    }
  },
  createGame: async (req, res) => {
    const { position, moves, whiteToMove, accepted, completed, white, black } = req.body;
    try {
      const game = await db.Game.create({
        position, moves, whiteToMove, accepted, completed, white, black,
      });
      res.send(game.dataValues);
    } catch (err) {
      console.log('err from createGame', err);
    }
  },
  confirmGame: async (req, res) => {
    res.send('hello from gamesController');
  },

  deleteGame: async (req, res) => {
    res.send('hello from gamesController');
  },

  updateGame: async (req, res) => {
    const { id, currentPosition, moves, whiteToMove } = req.body;
    try {
      const update = await db.Game.update({
        position: currentPosition,
        moves,
        whiteToMove: !whiteToMove,
      }, {
        where: { id },
        returning: true,
        plain: true,
      });
      res.send(update[1].dataValues);
    } catch (err) {
      console.log('err from updateGame', err);
    }
  },

  documentGame: async (req, res) => {
    // flip completed to true
    const { id, completed } = req.body
    try {
      const record = await db.Game.update({
        completed,
      }, {
        where: { id },
        returning: true,
        plain: true,
    });
    res.send(record);
    } catch (err) {
      console.log('err from saveGame', err)
    }
  },
};
