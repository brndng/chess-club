const passport = require('passport');
const LocalStrategy = require('./local-strategy');
const { User } = require('../../db/models.js');

// saved to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
  console.log('\t /// -----------serializeUser, user:', user)
	done(null, user.id);
});

// done(null, {id: user.dataValues.id});

passport.deserializeUser((id, done) => {
  console.log('\t /// -----------entering deserializing')
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;

// passport.serializeUser((user, done) => {
// 	console.log('*** serializeUser called, user: ')
// 	console.log(user) // the whole raw user object!
// 	console.log('---------')
// 	done(null, { id: user.dataValues.id })
// })



// // user object attaches to the request as req.user
// passport.deserializeUser((id, done) => {
// 	console.log('DeserializeUser called')
// 	User.findOne(
// 		{ id },
// 		'username',
// 		(err, user) => {
// 			console.log('*** Deserialize user, user:')
// 			console.log(user)
// 			console.log('--------------')
// 			done(null, user)
// 		}
// 	)
// })