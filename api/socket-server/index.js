const express = require('express');
const socket = require('socket.io');
const parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const PORT = 1337;
const server = app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
const io = socket(server);

const middleware = [
  helmet(), 
  parser.json(),
  parser.urlencoded({ extended: true }),
  cors({
    allowedHeaders: 'Content-Type, authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  }),
];

io.on('connection', (socket) => {
  console.log('made SOCKET connection!', socket.id);

  socket.on('gameId', (data) => {
    socket.join(data);
    socket.broadcast.to(data).emit('guestJoin', data);
  });

  socket.on('chat', (data) => {
    io.sockets.in(data.gameId).emit('chat', data.message);
  })

  socket.on('newMove', (data) => {
    console.log('newMove', data)
    socket.broadcast.to(data.gameId).emit('newMove', data.newMove)
  })
})

app.use(...middleware);