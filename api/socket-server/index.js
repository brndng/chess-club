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

  socket.on('game_id', (data) => {
    socket.join(data);
    socket.broadcast.to(data).emit('guestJoin', data);
  });

  socket.on('chat', (data) => {
    io.sockets.in(data.id).emit('chat', data.message);
  })

  socket.on('new_move', (data) => {
    socket.broadcast.to(data.id).emit('new_move', data.newMove)
  })

  socket.on('in_check', (data) => {
    socket.broadcast.to(data.id).emit('in_check', data.userId)
  })
})

app.use(...middleware);