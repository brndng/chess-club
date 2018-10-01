if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const socket = require('socket.io');
const path = require('path');
const db = require('./api/models/');
const router = require('./api/routes/');
const initSocketHandlers = require('./api/socket/');
const { apiMiddleware } = require('./api/middleware/');

const app = express();
const PORT = process.env.PORT;

app.use(...apiMiddleware);
app.use(router);
app.use(express.static(path.join(__dirname, './ui/client/dist')));
app.use(express.static(path.join(__dirname, './ui/client/static')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './ui/client/static/index.html')));

db.sequelize.sync().then(() => {
  const server = app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
  const io = socket(server);
  initSocketHandlers(io);
});
