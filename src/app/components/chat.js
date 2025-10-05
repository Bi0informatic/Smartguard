import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Image from "next/image";

export default function Chat({role, icon, text}) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');

    socketRef.current.on('message', msg => {
      console.log('Received:', msg);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit('message', 'Hello from client! I am a '+ role);
    }
  };

  return (
    <button
      type="button"
      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      onClick={sendMessage}
    >
      {icon}
      {text}
    </button>
  );
}
