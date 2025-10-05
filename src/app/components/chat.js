import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function Chat() {
  useEffect(() => {
    socket.on('message', msg => {
      console.log('Received:', msg);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit('message', 'Hello from client!');
  };

  return <button onClick={sendMessage}>Send</button>;
}