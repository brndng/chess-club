require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const path = require('path');
const db = require('./models/');
const router = require('./routes/');
const createSocketHandlers = require('./socket/');
const { apiMiddleware } = require('./middleware/');

const app = express();
console.log('------***--server.js--process.env.PORT', process.env.PORT);
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






// db.sequelize.sync().then(() => console.log('DB synced'));

// db.sequelize.sync().then(function() {
//   http.createServer(app).listen(app.get('port'), function(){
//     console.log('Express server listening on port ' + app.get('port'));
//   });
// });





