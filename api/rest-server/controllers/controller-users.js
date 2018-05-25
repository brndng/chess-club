const { Op } = require('sequelize');
const { User } = require('../../db/models.js');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
// const isValidPassword = (user, password) => {
//   return bCrypt.compare(password, user.password);
// };

module.exports = {
  registerUser: async (req, res) => {
    const { username } = req.body;
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
  verifyUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        where: { username },
      });
      //handle error: Unhandled promise rejection Error
      const isVerified = await bcrypt.compare(password, user.dataValues.password);
      if (isVerified) {
        req.session.username = username;
        res.send(user);
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
