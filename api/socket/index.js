module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('made SOCKET connection!', socket.id);
  
    socket.on('game_id', (data) => {
      socket.join(data);
      io.sockets.in(data).emit('guest', data);
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
  
    socket.on('resign', (data) => {  
      io.sockets.in(data.id).emit('resign', data.user);
    });
  
    socket.on('checkmate', (data) => {
      io.sockets.in(data.id).emit('checkmate', data.userId);
    });
  
    socket.on('draw_offer', (data) => {
      socket.broadcast.to(data.id).emit('draw_offer', data.userId);
    });
  
    socket.on('draw_accept', (data) => {
      socket.broadcast.to(data.id).emit('draw_accept', data.userId);
    });
  
    socket.on('draw_decline', (data) => {
      socket.broadcast.to(data.id).emit('draw_decline', data.userId);
    });
  });
}