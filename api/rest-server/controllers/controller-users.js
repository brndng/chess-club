const Op = require('sequelize').Op;
const models = require('../../db/models.js');

module.exports = {
  createUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await models.User.create({
        username,
        password,
      });
      res.send(user);
    } catch (err) {
      console.log('err from createUser', err)
    }
  },
  verifyUser: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await models.User.findOne({ where: {
        username,
        password,
      }});
      res.send(user);
    } catch (err) {
      console.log('err from verifyUser', err)
    }
  },
  terminateSession: async (req, res) => {
    res.send('hello from usersController')
  },
  fetchUser: async (req, res) => {
    res.send('hello from usersController')
  },
  fetchProfile: async (req, res) => {
    res.send('hello from usersController')
  },
} 

// module.exports = {
//   fetchUsernameById: async (id) => {
//     try {
//       const username = await models.User.findOne({ 
//         where: { id },
//       });
//       return username.username;
//     } catch (error) {
//       console.log('Error with fetchUsernameById', error);
//       return;
//     }
//   },
// }