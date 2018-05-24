const express = require('express');
const path = require('path');
const parser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('../db');
const router = require('./routes');

const app = express();
const PORT = 3000;

const middleware = [
  helmet(),
  parser.json(),
  parser.urlencoded({ extended: true }),
  session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
  }),
  passport.initialize(),
  passport.session(),
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  }),
];

// Express Validator
// expressValidator({
//   errorFormatter: function(param, msg, value) {
//     var namespace = param.split('.')
//     , root = namespace.shift()
//     , formParam = root;

//     while(namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param: formParam,
//       msg: msg,
//       value: value
//     };
//   }
// });

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
app.use(...middleware);
app.use(router);

sequelize.sync().then(() => console.log('DB synced'));

