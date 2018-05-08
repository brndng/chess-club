const Op = require('sequelize').Op;
const models = require('../../db/models.js');

module.exports = {
  fetchAllGames: async (req, res) => {
    const { user_id } = req.params;
    console.log('user_id',user_id);
    try {
      const games = await models.Game.findAll({ 
        where: { 
          [Op.or]: [{ id_white: user_id }, { id_black: user_id }]
        } 
      });
      console.log('result', games.map(game => game.dataValues)); ///*** */
      res.send(games.map(game => game.dataValues));
    } catch (err) {
      console.log('err from fetchAllGames', err)
    }
  },
  fetchGame: async (req, res) => { //filter by ...
    console.log('req.body', req.body)
    try {
      const game = await models.Game.findOne({ where: {
        id: '3',
      }});
      console.log('game', game)
      res.send(game);
    } catch (err) {
      console.log('err from fetchGame', err)
    }
  },
  createGame: async (req, res) => {
    const { position, moves, accepted, completed, id_white, id_black } = req.body;
    try {
      const game = await models.Game.create({
        position, moves, accepted, completed, id_white, id_black
      });
      res.send(game.dataValues);
    } catch(err) {
      console.log('err from createGame', err)
    }
  },
  confirmGame: async (req, res) => {
    //flip accepted to true
    res.send('hello from gamesController')
  },

  deleteGame: async (req, res) => {
    //delete record from games table
    res.send('hello from gamesController')
  },

  updateGame: async (req, res) => {
    //send new stringified position and move list
    res.send('hello from gamesController')
  },

  saveGame: async (req, res) => {
    // flip completed to true
    res.send('hello from gamesController')
  },
} 