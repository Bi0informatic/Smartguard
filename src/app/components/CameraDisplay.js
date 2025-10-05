// /src/app/components/CameraDisplay.js

'use client'; 

import React, { useRef, useState, useEffect } from 'react';

const CameraDisplay = () => {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState(null);
  // State to hold the MediaStream object for cleanup and connection
  const [currentStream, setCurrentStream] = useState(null);

  /**
   * Stops the camera stream and cleans up resources.
   */
  const stopCamera = () => {
    if (currentStream) {
      // Stop all tracks (video, audio) in the stream
      currentStream.getTracks().forEach(track => track.stop()); 
    }
    setCameraActive(false);
    setCurrentStream(null);
    setError(null);
    // Clear video element source to ensure it shows the placeholder
    if (videoRef.current) {
        videoRef.current.srcObject = null;
    }
  };

  /**
   * Handles connecting and playing the stream whenever currentStream state changes.
   * This useEffect hook separates stream acquisition from DOM manipulation (video playback).
   */
  useEffect(() => {
    // Logic runs only if both the video element ref and a stream object exist
    if (videoRef.current && currentStream) {
      
      // 1. Safety Check: Ensure the primary video track is active
      const videoTracks = currentStream.getVideoTracks();
      if (videoTracks.length > 0) {
          const track = videoTracks[0];
          if (!track.enabled) {
              console.warn("Video track was disabled, forcing enable.");
              track.enabled = true; // Force enable the track
          }
      }
        
      if (currentStream.active === false) {
          stopCamera();
          return;
      }
      
      // 2. Attach the stream to the video element
      videoRef.current.srcObject = currentStream;
      
      // 3. Wait for metadata to load before attempting playback
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().then(() => {
          // Playback successful
          setCameraActive(true);
          setError(null);
        }).catch(err => {
          // Error handling for playback failure (e.g., system issues)
          console.error("Error playing video:", err);
          setError("Failed to start video playback. Check browser console.");
          stopCamera(); // Stop the stream if playback fails
        });
      };
      
    } else if (cameraActive && !currentStream) {
      // If camera was active but stream disappeared, reset state
      setCameraActive(false);
    }
    
    // No cleanup required here as stopCamera is explicitly called on button press
  }, [currentStream]); // Dependency array: run this effect when the stream changes


  /**
   * Requests camera permission from the user and sets the stream state.
   */
  const startCamera = async () => {
    stopCamera(); // Ensure previous stream is stopped before starting a new one

    // Check for API support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Browser does not support the necessary camera API.");
      return;
    }

    try {
      // 1. Request media stream: only video, no audio
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false 
      });
      
      // 2. Success: set the stream state, which triggers the useEffect for connection/playback
      setCurrentStream(stream);

    } catch (err) {
      // Handle errors during permission request (e.g., user denied, device busy)
      console.error("Error accessing camera:", err);
      
      if (err.name === 'NotAllowedError') {
        setError("Camera access was denied. Please ensure permission is granted.");
      } else if (err.name === 'NotFoundError') {
        setError("No video input devices found (camera not detected).");
      } else {
        setError(`Failed to access camera: ${err.message || String(err)}`);
      }
      setCurrentStream(null);
      setCameraActive(false);
    }
  };

  return (
    <div>
      
      {/* --- Floating Camera Container (Top-Right) --- */}
      <div 
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '240px', // Fixed size for the video display
          height: '180px',
          backgroundColor: '#000',
          border: '3px solid #0070f3',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          zIndex: 100 // Ensure it floats above other content
        }}
      >
        {cameraActive ? (
          // Video element to display the stream
          // Use key to force remount when stream changes, fixing black screen issue
          <video
            key={currentStream ? currentStream.id : 'no-stream'} 
            ref={videoRef}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            muted // Mute the video feed
            autoPlay
            playsInline // Essential for mobile playback
          />
        ) : (
          // Placeholder when camera is off or in error state
          <div style={{ color: 'white', textAlign: 'center', padding: '50px 0' }}>
            Camera OFF
            {error && <p style={{fontSize: '12px', margin: '5px 0', color: 'red'}}>{error}</p>}
          </div>
        )}
      </div>

      {/* --- Main Control Area --- */}
      <div style={{ marginTop: '220px', padding: '20px' }}>
        <h1>Main Content Area</h1>
        <h2>Camera Control</h2>
        
        {/* Toggle button logic */}
        {cameraActive ? (
          <button 
            onClick={stopCamera} 
            style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Stop Camera
          </button>
        ) : (
          <button 
            onClick={startCamera} 
            style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Open Camera & Get Permission
          </button>
        )}
        
        {/* Status display */}
        <p style={{ marginTop: '10px' }}>
            **Current Status:** {cameraActive ? 'Streaming' : (error ? 'Error' : 'Inactive')}
        </p>
      </div>
    </div>
  );
};

export default CameraDisplay;