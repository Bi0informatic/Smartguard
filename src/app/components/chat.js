import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import ogSocket from './ogSocket';
import Image from "next/image";


export default function Chat({role, icon, text, input, type}) {


  
  useEffect(() => {
    console.log('Setting up socket connection...');

  ogSocket.connect(); // if not already connected

  ogSocket.on('message', msg => {
    console.log('Received:', msg);
  });

  return () => {
    ogSocket.off('message'); // clean up listener
  };
  }, []);

  const sendMessage = () => {
    if (ogSocket.connected) {
      ogSocket.emit('message', `Hello from client! I am a ${role}`);

      ogSocket.emit('alert', '12345');
      // if (hasInput) {
      //   if (type === "alert") {
      //     ogSocket.emit(type, input);
      //   } else if (type === "view-alerts") {
      //     ogSocket.emit(type);
      //   } else if ( type === "update-system") {
      //     ogSocket.emit(type, input)
      // }
      // }
    
    }

      alert('Alert Sent!');
    
    

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
};
