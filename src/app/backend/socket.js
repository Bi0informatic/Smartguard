const { Server } = require('socket.io');
const { writeDataset } = require('../../../dataset/utils/writeDataset');

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
      const content = {
        classRoom: room,
        user: socket.id.slice(0,4)
      }
      const strJson = JSON.stringify(content);
      writeDataset(strJson);
      // socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected');
    });
  });
}

module.exports = { setupSocket };