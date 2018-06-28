// const sequelize = require('./index.js');
// const { User, Game } = require('./models.js');

// const createDatabase = async (database) => {
//   try {
//     await sequelize.queryAsync(`CREATE DATABASE ${database}`);
//     success('successfully created database ', database);
//   } catch (err) {
//     error('error creating database ', err);
//   }
// };

// const dropDatabase = async (database) => {
//   try {
//     await sequelize.drop(`DROP DATABASE IF EXISTS ${database}`);
//     // success('successfully dropped database ', database);
//   } catch (err) {
//     error('error dropping database ', err);
//   }
// };

// https://stackoverflow.com/questions/11175676/restart-node-upon-changing-a-file
// https://stackoverflow.com/questions/44915758/node-process-env-variable-name-returning-undefined
// console.log('///BUILD TABLES.js PORT', process.env.PORT);
// console.log('process.env', process.env.NODE_ENV)

// const createTables = async () => {
//   try {
//     await sequelize.authenticate();
//     await User.sync({ force: true });
//     await Game.sync({ force: true });
//     process.exit();
//   } catch (err) {
//     console.log('error from create-tables.js', err);
//   }
// };

// createTables();

