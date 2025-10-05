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

  return <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" onClick={sendMessage}>Send</button>;
}