const { Server } = require('socket.io');
const { writeDataset } = require('')

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // allow frontend origin
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', socket => {
    console.log('🔗 Client connected');

    socket.on('message', msg => {
      console.log(`📨 Received: ${socket.id.slice(0,4)}`, msg);
      socket.broadcast.emit('message', msg);
    });

    socket.on('alert', room => {
      console.log(`${socket.id.slice(0,4)}'s room number is `, room);
      
      socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected');
    });
  });
}

module.exports = { setupSocket };