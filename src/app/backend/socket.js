import { Server } from 'socket.io';

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
      console.log(`📨 Received: ${socket.id}`, msg);
      socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected');
    });
  });
}

export default { setupSocket };