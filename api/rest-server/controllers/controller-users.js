const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models.js');

module.exports = {
  registerUser: async (req, res) => {
    const { username } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(req.body.password, salt);
    try {
      const user = await User.create({
        username,
        password,
      });
      console.log('user', user)
      res.send(user);
    } catch (err) {
      console.log('err from createUser', err);
    }
  },
  sendUserInfo: (req, res) => {
    console.log('------logged in req.user:', req.user);
    console.log('------req.session:', req.session);
    if (req.user) {
      // res.json(req.session.passport); 
      res.json(req.user);
    } else {
      res.json(null);
    }
  },

  terminateSession: async (req, res) => {
    res.send('hello from usersController');
  },
  
  fetchProfile: async (req, res) => {
    res.send('hello from usersController');
  },

  fetchPlayers: async (req, res) => {
    try {
      const players = await User.findAll();
      // console.log('\tplayers/////////', players)
      res.send(players);
    } catch (err) {
      console.log('err from createUser', err);
    }
  }
};
