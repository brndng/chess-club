if (!global.hasOwnProperty('db')) {
  const Sequelize = require('sequelize');
  console.log('------***--models/-----process.env',process.env)
  /// 
  console.log('------***--models/-----process.env.DATABASE_URL',process.env.DATABASE_URL)
  /// heroku's URL
  console.log('------***--models/-----process.env.NODE_ENV',process.env.NODE_ENV)
  /// production
  const DATABASE_URL = process.env.DATABASE_URL || 'postgres://Brian@localhost:5432/chess';
  
  // let sequelize = null;

  // if (process.env.DATABASE_URL) {
  //   sequelize = new Sequelize(process.env.DATABASE_URL, {
  //     // dialect:  'postgres',
  //     // protocol: 'postgres',
  //     // port:     match[4],
  //     // host:     match[3],
  //     logging:  true
  //   });
  // } else {
  //   sequelize = new Sequelize('postgres://Brian@localhost:5432/chess', {
  //     pool: {
  //       max: 5,
  //       min: 0,
  //       idle: 10000,
  //     },
  //     logging: false,
  //   });
  // }

  sequelize = new Sequelize(DATABASE_URL, {
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
