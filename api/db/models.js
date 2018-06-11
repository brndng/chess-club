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
  drawOfferedBy: Sequelize.INTEGER,
  completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  winner: Sequelize.INTEGER,
});

// Associations
Game.belongsTo(User, { foreignKey: 'white' });
Game.belongsTo(User, { foreignKey: 'black' });

module.exports = { User, Game };


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