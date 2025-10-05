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

  ogSocket.on('alerts-list', data => {
    console.log(data);
  })
  
  return () => {
    ogSocket.off('message'); // clean up listener
  };
  }, []);

  const sendMessage = () => {
    if (ogSocket.connected) {
      if (type === 'alert') { 
        if(input != '' && confirm(`Send alert for room number ${input}?`)) {
          ogSocket.emit('alert', input);
          alert('Alert Sent123!');
        }
      }
    }

    if (type === 'update-system') {
      if(input != '' && confirm(`Update system?`)) {
        ogSocket.emit('update-system', input);
        alert('System Updated!');
      }
    }

    if(type === 'view-alerts') {
      ogSocket.emit('view-alerts');
      alert('Viewing Alerts!');
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
