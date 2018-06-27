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
// console.log('process.env.PORT',process.env.PORT)
// console.log('SEQUELIZE INDEX process.env.DATABASE_URL',process.env.DATABASE_URL)


const sequelize = new Sequelize('postgres://Brian@localhost:5432/chess', {
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});

module.exports = sequelize;
