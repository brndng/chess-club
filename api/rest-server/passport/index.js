const passport = require('passport');
const LocalStrategy = require('./local-strategy');
const { User } = require('../../db/models.js');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('\t /// -----------serializeUser, user: \n', user)
	done(null, user.dataValues.id);
});

passport.deserializeUser((id, done) => {
  console.log('\t /// -----------entering deserializing')
  User.findById(id, (err, user) => {
    console.log('\t /// -----------deserializing user: ', user);
    done(err, user);
  });
});

passport.use(LocalStrategy)

module.exports = passport;