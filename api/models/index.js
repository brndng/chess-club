if (!global.hasOwnProperty('db')) {
  const Sequelize = require('sequelize');
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  });

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(__dirname + '/user.js'),
    Game: sequelize.import(__dirname + '/game.js')
  }

  global.db.Game.belongsTo(global.db.User, { foreignKey: 'white' });
  global.db.Game.belongsTo(global.db.User, { foreignKey: 'black' });
}

module.exports = global.db;
