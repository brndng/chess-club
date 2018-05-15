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
  moves: Sequelize.JSON,
  whiteToMove: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  inCheck: Sequelize.INTEGER,
  accepted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
});

const Friend = sequelize.define('friends', {
  accepted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false }
});

Game.belongsTo(User, { foreignKey: 'white' });
Game.belongsTo(User, { foreignKey: 'black' });
Friend.belongsTo(User, { foreignKey: 'user1' });
Friend.belongsTo(User, { foreignKey: 'user2' });

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