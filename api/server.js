require('dotenv').config(); 
  //DEV: writes .env contents to process.env...
  //PROD: process.env.PORT overwritten by heroku config var
const express = require('express');
const socket = require('socket.io');
const path = require('path');
const db = require('./models/');
const router = require('./routes/');
const createSocketHandlers = require('./socket/');
const { apiMiddleware } = require('./middleware/');

const app = express();
console.log('------***--server.js--process.env.PORT', process.env.PORT); /// 27314 overrides in prod
const PORT = process.env.PORT || 3000;

app.use(...apiMiddleware);
app.use(router);
app.use(express.static(path.join(__dirname, '../ui/client/dist/')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../ui/client/dist/index.html')));

db.sequelize.sync().then(() => {
  const server = app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
  const io = socket(server);
  createSocketHandlers(io);
});





