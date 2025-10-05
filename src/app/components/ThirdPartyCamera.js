// src/app/components/ThirdPartyCamera.js
'use client'; 

import React, { useEffect } from 'react';
import { useRecordWebcam } from 'react-record-webcam';

// Define constraints for the webcam feed (optional, but good practice)
const OPTIONS = {
  fileName: "test-webcam",
  mimeType: "video/webm",
  width: { ideal: 640 },
  height: { ideal: 480 },
  // Setting facingMode to "user" (front camera) is often necessary for stability
  facingMode: "user" 
};

const ThirdPartyCamera = () => {
  // Use the hook to get all necessary functions and state
  const { 
    openCamera, 
    status,
    webcamRef, // The ref that must be attached to the <video> element
    activeRecordings 
  } = useRecordWebcam(OPTIONS);

  // Use useEffect to automatically open the camera when the component mounts
  useEffect(() => {
    // Check if the camera is not already open before trying to open it
    if (status === 'INIT' || status === 'CLOSED') {
        openCamera()
          .then(() => console.log("Camera successfully opened by third-party component."))
          .catch(err => console.error("Error opening camera:", err));
    }
    
    // Optional cleanup function (though the library usually handles stream stopping)
    // return () => { 
    //   // If we had a closeCamera function, we'd call it here
    // };
  }, [status, openCamera]); // Dependencies: Re-run if status or openCamera changes

  return (
    // This is the floating camera container (<div>)
    <div 
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '240px', // Display size
        height: '180px',
        backgroundColor: '#000',
        border: '3px solid #6c757d', // Different border color to distinguish
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        zIndex: 100
      }}
    >
      {/* The webcamRef MUST be attached to this <video> element 
        for the library to inject the stream.
      */}
      <video
        ref={webcamRef} 
        autoPlay
        muted
        playsInline
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          // Optionally hide the video element if status is not 'OPEN'
          visibility: status === 'OPEN' ? 'visible' : 'hidden' 
        }}
      />

      {/* Status Overlay */}
      <div 
          style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%',
              backgroundColor: status === 'OPEN' ? 'transparent' : 'rgba(0,0,0,0.8)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none', // Allow clicks to pass through to the element below
              opacity: status === 'OPEN' ? 0 : 1 // Hide overlay when open
          }}
      >
          {/* Display current status */}
          <p>{status === 'OPEN' ? '' : `Camera Status: ${status? 'ON': 'OFF'}`}</p>
      </div>

    </div>
  );
};

export default ThirdPartyCamera;