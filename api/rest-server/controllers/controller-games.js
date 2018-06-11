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
  registerMove: async (req, res) => {
    const { id, user, currentPosition, moves, whiteToMove } = req.body;
    let isCorrectTurn = true;

    try {
      const game = await Game.findOne({ where: { id } });
      if (
        !((user.id === game.white && whiteToMove )
        ||(user.id === game.black && !whiteToMove ))
      ) {
        isCorrectTurn = false;
      }
    } catch (err) {
      console.log('err from registerMove findOne', err);
    }

    if (!isCorrectTurn) {
      res.status(401).send('No hacks allowed. You may only move on your turn.');
    } else {
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
        console.log('err from registerMove update', err);
      }
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
    const { id, user, completed, winner } = req.body;
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

  registerDrawOffer: async (req,res) => {
    const { id, user } = req.body;
    try {
      const record = await Game.update({
        drawOfferedBy: user.id,
      }, { where: { id } });
      res.send(record);
    } catch (err) {
      console.log('err from registerDrawOffer', err);
    }
  },

  acceptDraw: async (req, res) => {
    const { id, user, completed, winner } = req.body;
    let drawOfferedByOpponent = true;

    try {
      const game = await Game.findOne({ where: { id } });
      if (
         !((user.id === game.white && game.drawOfferedBy === game.black)
         && (user.id === game.black && game.drawOfferedBy === game.white))
      ) {
        drawOfferedByOpponent = false;
      }
    } catch (err) {
      console.log('err from acceptDraw findOne', err)
    }

    if (!drawOfferedByOpponent) {
      res.status(401).send('No hacks allowed. You may only accept draws if offered by the opponent.');
    } else {
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
        console.log('err from acceptDraw update', err)
      }
    }
  }
};
