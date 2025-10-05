import { useRef } from 'react';
import { io } from 'socket.io-client';
import { ogSocket } from './ogSocket';

export default function Chat({ role }) {
  

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('message', `Hello from client! I am a ${role}`);
    } else {
      console.warn('⚠️ Socket not connected yet');
    }
  };

  return (
    <div>
      <button onClick={connectSocket}>Connect</button>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
