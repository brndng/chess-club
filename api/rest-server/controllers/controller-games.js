const { Op } = require('sequelize');
const { Game } = require('../../db/models.js');
const { initialPosition, areEqual } = require('../../../rules/utilities/');

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
    const { white, black, whiteUsername, blackUsername } = req.body;
    try {
      const game = await Game.create({
        position: initialPosition, 
        moves: [],
        whiteToMove: true,
        inCheck: null,
        completed: false, 
        white, 
        black,
        whiteUsername, 
        blackUsername,
      });
      res.send(game.dataValues);
    } catch (err) {
      console.log('err from createGame', err);
    }
  },
  registerMove: async (req, res) => {
    const { id, user, currentPosition, moves, whiteToMove, positionHistory } = req.body;
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
        const update = await Game.update({
          position: currentPosition,
          moves,
          whiteToMove: !whiteToMove,
          positionHistory: [...positionHistory, currentPosition],
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
    const { id, moves, completed, winner, result } = req.body;
    try {
      const record = await Game.update({
        moves,
        completed,
        winner,
        result,
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
  registerDrawOffer: async (req, res) => {
    const { id, userId } = req.body;
    try {
      const record = await Game.update({
        drawOfferedBy: userId,
      }, { 
        where: { id },
      });
      res.status(200).send('draw offered');
    } catch (err) {
      console.log('err from registerDrawOffer', err);
    }
  },
  resign: async (req, res) => {
    const { id, user, completed, winner, result } = req.body;

    if (user.id !== req.session.user) {
      res.status(401).send('No hacks allowed. Only authenticated users may resign from games.')
    } else {
      try {
        const record = await Game.update({
          completed,
          winner,
          result,
        }, {
          where: { id },
          returning: true,
          plain: true,
        });
        res.status(200).send(`${user.username} has resigned.`);
      } catch (err) {
        console.log('err from resign', err)
      }
    }
  },
  acceptDraw: async (req, res) => {
    const { id, user, completed, winner, result } = req.body;
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
          result,
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




