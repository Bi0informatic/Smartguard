const { Server } = require('socket.io');

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // allow frontend origin
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', socket => {
    console.log('🔗 Client connected');

    socket.on('message', msg => {
      console.log('📨 Received:', msg);
      socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected');
    });
  });
}

module.exports = { setupSocket };