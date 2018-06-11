const { Op } = require('sequelize');
const { Game } = require('../../db/models.js');

module.exports = {
  fetchAllGames: async (req, res) => {
    const { user_id } = req.params;
    try {
      const games = await Game.findAll({ 
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
      const game = await Game.findOne({ where: { id } });
      res.send(game);
    } catch (err) {
      console.log('err from fetchGame', err);
    }
  },
  createGame: async (req, res) => {
    const { white, black } = req.body;
    const position = [ 
      ["r","n","b","q","k","b","n","r"],
      ["p","p","p","p","p","p","p","p"],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      [null,null,null,null,null,null,null,null],
      ["P", "P", "P", "P", "P", "P", "P", "P"],
      ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ];
    try {
      const game = await Game.create({
        position, 
        moves: [],
        whiteToMove: true,
        inCheck: null,
        completed: false, 
        white, 
        black,
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

  registerMove: async (req, res) => {
    const { user, game, currentPosition, moves, whiteToMove } = req.body;
    const { id, white, black} = game;

    if (
        (user.id === white && whiteToMove )
        ||(user.id === black && !whiteToMove )
    ) {
      try {
        // if (!rules.isLegalMove(....) ) {
        //   res.status(400).send('no hacks allowed.')
        // }
        const update = await Game.update({
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
        console.log('err from registerMove', err);
      }
    } else {
      res.status(401).send('No hacks allowed. You may only move on your turn.');
    }

  },

  updateCheck: async (req, res) => {
    const { id, inCheck } = req.body;
    try {
      const update = await Game.update({
        inCheck,
      }, {
        where: { id },
        returning: true,
        plain: true,
      });
      res.send(update[1].dataValues);
    } catch (err) {
      console.log('err from updateCheck', err);
    }
  },

  documentGame: async (req, res) => {
    const { id, completed, winner } = req.body
    try {
      const record = await Game.update({
        completed,
        winner,
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
