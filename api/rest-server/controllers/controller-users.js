const { Op } = require('sequelize');
const models = require('../../db/models.js');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

module.exports = {
  registerUser: async (req, res) => {
    const { username } = req.body;
    const password = bcrypt.hashSync(req.body.password, salt);
    try {
      const user = await models.User.create({
        username,
        password,
      });
      res.send(user);
    } catch (err) {
      console.log('err from createUser', err);
    }
  },
  verifyUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await models.User.findOne({
        where: { username },
      });
      try {
        const isVerified = await bcrypt.compare(password, user.dataValues.password);
        if (isVerified) {
          req.session.username = username;
          res.send(user);
        } 
      } catch (err) {
        res.send('');
      }
    } catch (err) {
      console.log('err from verifyUser', err);
    }
  },
  terminateSession: async (req, res) => {
    res.send('hello from usersController');
  },
  fetchUser: async (req, res) => {
    res.send('hello from usersController');
  },
  fetchProfile: async (req, res) => {
    res.send('hello from usersController');
  },
};
