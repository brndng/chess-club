const express = require('express');
const path = require('path');
const parser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('./passport');
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

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
app.use(...middleware);
app.use(router);

sequelize.sync().then(() => console.log('DB synced'));

