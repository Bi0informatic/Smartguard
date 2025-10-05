// components/CameraFeature.jsx
import React, { useState, useRef, useEffect } from 'react';

const CameraFeature = () => {
  // State: Controls whether the camera is on or off
  const [isCameraOn, setIsCameraOn] = useState(false);
  // Ref: Used to connect the <video> element to the media stream
  const videoRef = useRef(null);
  // Ref: Used to store the current MediaStream object, making it easy to stop the stream later
  const streamRef = useRef(null);

  // Function to toggle the camera state
  const toggleCamera = () => {
    setIsCameraOn(prev => !prev);
  };

  useEffect(() => {
    // Async function: Start the camera
    const startCamera = async () => {
      try {
        // 1. Request access to the user's media devices (requesting video only)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // 2. Save the media stream to the Ref
        streamRef.current = stream;

        // 3. Connect the media stream to the <video> element
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
        alert('Could not access your camera. Please ensure you grant permission and your browser supports getUserMedia.');
        setIsCameraOn(false); // Automatically set state to off on failure
      }
    };

    // Function: Stop the camera
    const stopCamera = () => {
      if (streamRef.current) {
        // Stop all tracks (streams)
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        streamRef.current = null;
      }
    };

    // Effect main logic
    if (isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }

    // Cleanup function: Executes when the component unmounts or isCameraOn becomes false
    return () => {
      stopCamera();
    };
  }, [isCameraOn]); // Dependency array: Execute only when isCameraOn changes

  return (
    <div>
      {/* Button Section */}
      <button 
        onClick={toggleCamera} 
        className="p-3 m-5 text-lg bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
        style={{ padding: '10px 20px', fontSize: '16px', margin: '20px' }}
      >
        {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
      </button>

      {/* Camera Display Area */}
      {isCameraOn && (
        <div 
          style={cameraContainerStyle}
        >
          {/* video element: Use ref to connect the media stream */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={videoStyle}
          />
        </div>
      )}
    </div>
  );
};

// CSS Style Definitions
const cameraContainerStyle = {
  // Key property: Fixed positioning to the top-right corner
  position: 'fixed',
  top: '20px',
  right: '20px',
  // Dimensions and border
  width: '240px',
  height: '180px',
  border: '3px solid #4CAF50',
  borderRadius: '8px',
  zIndex: 9999, // Ensure it is on top of other elements
  backgroundColor: '#000',
  overflow: 'hidden',
};

const videoStyle = {
  // Ensure the video element fills its container
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Maintain aspect ratio and fill the container
  transform: 'scaleX(-1)', // Optional: Mirror flip for a more intuitive "mirror" view
};

export default CameraFeature;