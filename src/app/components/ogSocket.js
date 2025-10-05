import { io } from 'socket.io-client';

const ogSocket = io('http://localhost:4000', {
  autoConnect: false, // optional: delay connection until you call socket.connect()
});

export default ogSocket;
