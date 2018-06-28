const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

// Models
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  wins: Sequelize.INTEGER,
  losses: Sequelize.INTEGER,
  draws: Sequelize.INTEGER,
});

const Game = sequelize.define('game', {
  position: Sequelize.ARRAY(Sequelize.TEXT),
  moves: Sequelize.JSON,
  whiteToMove: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
  inCheck: Sequelize.INTEGER,
  whiteUsername: Sequelize.STRING,
  blackUsername: Sequelize.STRING,
  drawOfferedBy: Sequelize.INTEGER,
  positionHistory: { type: Sequelize.JSON, allowNull: false, defaultValue: [] },
  completed: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  winner: Sequelize.INTEGER,
  result: Sequelize.STRING,
});

// Associations
Game.belongsTo(User, { foreignKey: 'white' });
Game.belongsTo(User, { foreignKey: 'black' });

module.exports = sequelize;

// const sequelize = new Sequelize('chess', 'Brian', '', {
//   host: 'localhost',
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000,
//   },
//   logging: false,
// });
// console.log('process.env.PORT',process.env.PORT)
// console.log('SEQUELIZE INDEX process.env.DATABASE_URL',process.env.DATABASE_URL)
