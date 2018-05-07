const Sequelize = require('sequelize');
const sequelize = require('./index.js');

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  bio: Sequelize.STRING,
  wins: Sequelize.INTEGER,
  losses: Sequelize.INTEGER,
  draws: Sequelize.INTEGER,
});

const Game = sequelize.define('game', {
  position: Sequelize.ARRAY(Sequelize.TEXT),
  moves: Sequelize.ARRAY(Sequelize.TEXT),
  accepted: Sequelize.BOOLEAN,
  completed: Sequelize.BOOLEAN,
});

const Friend = sequelize.define('friends', {
  accepted: Sequelize.BOOLEAN
});

Game.belongsTo(User, { foreignKey: 'id_white' });
Game.belongsTo(User, { foreignKey: 'id_black' });
Friend.belongsTo(User, { foreignKey: 'id_user1' });
Friend.belongsTo(User, { foreignKey: 'id_user2' });

module.exports = { User, Game, Friend }


// CREATING/DROPPING PROGRAMATICALLY 
// const createDatabase = async database => {
//   try {
//     await sequelize.queryAsync(`CREATE DATABASE ${database}`);
//     success('successfully created database ', database);
//   } catch (err) {
//     error('error creating database ', err);
//   }
// };

// const dropDatabase = async database => {
//   try {
//     await sequelize.queryAsync(`DROP DATABASE IF EXISTS ${database}`);
//     success('successfully dropped database ', database);
//   } catch (err) {
//     error('error dropping database ', err);
//   }
// };