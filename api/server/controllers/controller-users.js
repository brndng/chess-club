const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { User } = require('../../db/models.js');

module.exports = {
  registerUser: async (req, res) => {
    const { username } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const password = await bcrypt.hash(req.body.password, salt);
    let isUsernameTaken = false;

    try {
      const user = await User.findOne({
        where: { username },
      });
      if (user) {
        isUsernameTaken = true;
      }
    } catch (err) {
      console.log('​err from registerUser', err);
    }

    if (isUsernameTaken) {
      res.status(401).send('Sorry, that username is already taken.');
    } else {
      try {
        const user = await User.create({
          username,
          password,
        });
        res.status(200).send('Your account has been created!');
      } catch (err) {
        console.log('err from createUser', err);
      }
    }
  },
  authenticateUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        where: { username },
      });
			if (!user) {
				res.status(401).send('Incorrect username.');
			}
			if (user) {
        const isVerified = await bcrypt.compare(password, user.dataValues.password);
        if (!isVerified) {
          res.status(401).send('Incorrect password.');
        }
        req.session.user = user.id;
        const userData = { id: user.id, username: user.username }
        res.send(userData);
			}
    } catch (err) {
      console.log(err);
    }
  },
  fetchCurrentUser: async (req, res) => {
    if (req.session.user) { 
      const id = req.session.user;
      try {
        const user = await User.findOne({
          where: { id },
        });
        const userData = { id: user.id, username: user.username }
        res.send(userData);
      } catch (err) {
        console.log('err from fetchCurrentUser')
      }
    } else {
      res.status(401).end();
    }
  },
  terminateSession: async (req, res) => {
    req.session.destroy();
    res.end();
  },
  fetchProfile: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: { id },
      });
      res.send(user);
    } catch (err) {
      console.log('err from fetchProfile', err);
    }
  },
  fetchPlayers: async (req, res) => {
    try {
      const players = await User.findAll();
      res.send(players);
    } catch (err) {
      console.log('err from createUser', err);
    }
  }
};
