const express = require('express');
const socket = require('socket.io');
const parser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
// const path = require('path');

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
    socket.broadcast.to(data).emit('guest', data);
  });

  socket.on('chat', (data) => {
    io.sockets.in(data.id).emit('chat', data.message);
  });

  socket.on('move', (data) => {
    socket.broadcast.to(data.id).emit('move', data.newMove);
  });

  socket.on('check', (data) => {
    io.sockets.in(data.id).emit('check', data.userId);
  });

  socket.on('game_over', (data) => {
    io.sockets.in(data.id).emit('game_over', data.userId);
  });

  socket.on('draw_offer', (data) => {
    socket.broadcast.to(data.id).emit('draw_offer', data.userId);
  })

  socket.on('draw_response', (data) => {
    socket.broadcast.to(data.id).emit('draw_response', data);
  })
});

app.use(...middleware);
