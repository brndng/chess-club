const passport = require('passport');
const LocalStrategy = require('./local-strategy');
const { User } = require('../../db/models.js');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('\t /// -----------serializeUser, user: \n', user.dataValues)
	done(null, user.dataValues.id);
});

passport.deserializeUser((id, done) => {
  console.log('\t /// -----------entering deserializing')
  User.findById(id, (err, user) => {
    console.log('\t /// -----------deserializing user: ', user);
    done(err, user.dataValues.id);
  });
});

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

passport.use(LocalStrategy)

module.exports = passport;