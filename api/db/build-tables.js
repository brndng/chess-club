const sequelize = require('./index.js');
const { User, Game } = require('./models.js');

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

