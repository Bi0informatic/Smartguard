// src/app/components/ControlledWebcam.js
'use client'; 

import React, { useCallback, useEffect } from 'react';
import { useRecordWebcam } from 'react-record-webcam';

// Define options for the webcam feed. We set ideal resolution for display.
const OPTIONS = {
  fileName: "live-feed", 
  mimeType: "video/webm",
  width: { ideal: 320 },
  height: { ideal: 240 },
  facingMode: "user" // Use the front-facing camera (if available)
};

const ControlledWebcam = () => {
  const { 
    openCamera, 
    closeCamera, // Function to close the camera stream
    status,
    webcamRef, // The ref for the <video> element
  } = useRecordWebcam(OPTIONS);

  // Function to toggle the camera state based on its current status
  const handleToggleCamera = useCallback(() => {
    if (status === 'CLOSED' || status === 'INIT' || status === 'ERROR') {
      // If closed, initial, or had an error, try to open the camera
      openCamera()
        .then(() => console.log("Camera successfully requested."))
        .catch(err => console.error("Error attempting to open camera:", err));
    } else if (status === 'OPEN' || status === 'RECORDING') {
      // If open, close the camera
      closeCamera()
        .then(() => console.log("Camera closed."))
        .catch(err => console.error("Error closing camera:", err));
    }
  }, [status, openCamera, closeCamera]);

  // Optional: Clean up the stream when the component is removed from the DOM
  useEffect(() => {
    return () => {
      // Cleanly close the camera when the component unmounts
      if (status === 'OPEN' || status === 'RECORDING') {
        closeCamera();
      }
    };
  }, [closeCamera, status]);


  // Logic for button appearance and text
  const isCameraOpen = status === 'OPEN';
  const buttonText = isCameraOpen ? 'Close Camera' : 'Open Camera';
  const buttonColor = isCameraOpen ? '#dc3545' : '#28a745';
  
  // Localized status message for display
  let statusMessage = status;
  if (status === 'INIT') statusMessage = 'Initializing';
  if (status === 'CLOSED') statusMessage = 'Closed';
  if (status === 'OPEN') statusMessage = 'Streaming (OPEN)';
  if (status === 'NOT_SUPPORTED') statusMessage = 'Not Supported';
  if (status === 'ERROR') statusMessage = 'Error Occurred';


  return (
    <div>
      {/* Floating Webcam Container (Top-Right) */}
      <div 
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '320px', 
          height: '240px',
          backgroundColor: '#000',
          border: '3px solid #0070f3',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          zIndex: 100
        }}
      >
        {/* Video element: webcamRef must be attached here */}
        <video
          ref={webcamRef} 
          autoPlay
          muted
          playsInline
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            // Only show the video element when the camera is successfully open
            visibility: isCameraOpen ? 'visible' : 'hidden' 
          }}
        />

        {/* Status Overlay: Displayed when the camera is not open */}
        {!isCameraOpen && (
          <div 
              style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none', // Allows video element to receive underlying events if needed
              }}
          >
              <p>Camera Status: {statusMessage}</p>
          </div>
        )}
      </div>

      {/* --- Main Control Area --- */}
      <div style={{ marginTop: '300px', padding: '20px' }}>
        <h2>Webcam Control</h2>
        
        {/* Toggle Button */}
        <button 
          onClick={handleToggleCamera} 
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px', 
            backgroundColor: buttonColor, 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
          // Disable button only when the camera is in a broken state
          disabled={status === 'NOT_SUPPORTED'}
        >
          {buttonText}
        </button>
        
        {/* Real-time Status Display */}
        <p style={{ marginTop: '10px' }}>
            **Current Status:** {statusMessage}
        </p>
        {(status === 'ERROR' || status === 'NOT_SUPPORTED') && 
            <p style={{ color: 'red' }}>Please check camera permissions or browser support.</p>
        }
      </div>
    </div>
  );
};

export default ControlledWebcam;