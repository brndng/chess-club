const express = require('express');
const path = require('path');
const sequelize = require('../db');
const router = require('./routes');
const { apiMiddleware } = require('./middleware/');

const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

app.use(express.static(path.join(__dirname, '../../ui/client/dist/')));
app.use(...apiMiddleware);
app.use(router);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../ui/client/dist/index.html')));

sequelize.sync().then(() => console.log('DB synced'));



