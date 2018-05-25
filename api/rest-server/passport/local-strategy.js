const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy
const { User } = require('../../db/models.js');

const strategy = new LocalStrategy(
	{
    usernameField: 'username',
    // passReqToCallback: true,
	},

  async (username, password, done) => {
    const salt = bcrypt.genSaltSync(10);

    try {
      const user = await User.findOne({
        where: { username },
      });
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (user) {
        const isVerified = await bcrypt.compare(password, user.dataValues.password);
        if (!isVerified) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user);
			}
    } catch (err) {
      console.log(err);
    }
  },
)

module.exports = strategy;