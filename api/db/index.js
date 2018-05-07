const Sequelize = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('chess', 'Brian', '', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false
});

module.exports = sequelize;