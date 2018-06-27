const sequelize = require('./index.js');
const { User, Game } = require('./models.js');

console.log('DEFINED DB??? process.env.PORT', process.env.PORT)

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

const buildTables = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ force: true });
    await Game.sync({ force: true });
    process.exit();
  } catch (err) {
    console.log('error from build-tables.js', err);
  }
};

buildTables();

