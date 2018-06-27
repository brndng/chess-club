if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const express = require('express');
const socket = require('socket.io');
const path = require('path');
const sequelize = require('./db/');
const models = require('./db/models.js');
const router = require('./routes/');
const createSocketHandlers = require('./socket/');
const { apiMiddleware } = require('./middleware/');

const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
const io = socket(server);
createSocketHandlers(io);

app.use(...apiMiddleware);
app.use(router);
app.use(express.static(path.join(__dirname, '../ui/client/dist/')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../ui/client/dist/index.html')));


sequelize.sync().then(() => console.log('DB synced'));





