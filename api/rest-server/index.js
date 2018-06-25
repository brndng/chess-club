const express = require('express');
const socket = require('socket.io');
const path = require('path');
const sequelize = require('../db');
const router = require('./routes');
const { apiMiddleware } = require('./middleware/');
const createSocketHandlers = require('./socket/');

const app = express();
const PORT = 3000;
const server = app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
const io = socket(server);

createSocketHandlers(io);

app.use(express.static(path.join(__dirname, '../../ui/client/dist/')));
app.use(...apiMiddleware);
app.use(router);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../ui/client/dist/index.html')));

sequelize.sync().then(() => console.log('DB synced'));



