if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      // dialect:  'postgres',
      // protocol: 'postgres',
      // port:     match[4],
      // host:     match[3],
      logging:  true
    });
  } else {
    // local
    sequelize = new Sequelize('postgres://Brian@localhost:5432/chess', {
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      logging: false,
    });
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: sequelize.import(__dirname + '/user.js'),
    Game: sequelize.import(__dirname + '/game.js')
  }

  /*
    Associations can be defined here. E.g. like this:
    global.db.User.hasMany(global.db.SomethingElse)
  */

  global.db.Game.belongsTo(global.db.User, { foreignKey: 'white' });
  global.db.Game.belongsTo(global.db.User, { foreignKey: 'black' });
}

module.exports = global.db

// DATABASE_URL=postgres://Brian@localhost:5432/chess