const Sequelize = require('sequelize');

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

const sequelize = new Sequelize('postgres://Brian@localhost:5432/chess', {
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

console.log('process.env.PORT DB', process.env.PORT);
module.exports = sequelize;
