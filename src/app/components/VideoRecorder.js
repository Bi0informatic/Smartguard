// /src/app/VideoRecorder.js

'use client';

import React, { useState } from 'react';
import { useRecordWebcam } from 'react-record-webcam';

const UPLOAD_URL = '/api/upload-video'; // Replace with your actual backend endpoint

const VideoRecorder = () => {
  // Use the hook to get necessary functions and state
  const {
    activeRecordings,
    createRecording,
    openCamera,
    startRecording,
    stopRecording,
    // FIX: This line was the error
    getBlob, // <--- Correct function name for getting the file data
    cancelRecording,
    status
  } = useRecordWebcam({
    // Optional: set the file format for recording
    mediaRecorderOptions: {
      mimeType: 'video/webm; codecs=vp9'
    },
    // Optional: request audio as well
    mediaTrackConstraints: {
      video: true,
      audio: true
    }
  });

  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Helper to get the ID of the current (first) recording instance
  const recordingId = activeRecordings.length > 0 ? activeRecordings[0].id : null;
  const currentRecording = activeRecordings.length > 0 ? activeRecordings[0] : null;

  /**
   * Main function to upload the recorded video blob to the backend.
   */
  const handleUpload = async () => {
    if (!recordingId) return;

    setIsUploading(true);
    setMessage('Uploading video...');

    try {
      // 1. Get the video data as a Blob
      const blob = await currentRecording.getBlob();

      // 2. Prepare the data for upload (FormData is standard for file uploads)
      const formData = new FormData();
      // Append the Blob as a file. The third argument is the filename.
      formData.append('video_file', blob, `recorded-video-${Date.now()}.webm`);

      // 3. Send the file to the backend API
      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData,
        // Note: The 'Content-Type': 'multipart/form-data' header is automatically
        // set by the browser when you pass a FormData object to the body.
      });

      if (response.ok) {
        setMessage('Upload successful! Preparing to clear recording...');
        // Optionally get and log the backend response data
        const result = await response.json();
        console.log("Backend response:", result);
        
        // 4. Clean up after successful upload
        setTimeout(() => {
          cancelRecording(recordingId); // Clear the current recording instance
          setMessage('Ready to record again.');
          setIsUploading(false);
        }, 2000); 

      } else {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(`Upload failed: ${error.message}`);
      setIsUploading(false);
    }
  };

  /**
   * State machine to manage the recording flow
   */
  const renderControls = () => {
    switch (status) {
      case 'idle':
      case 'error':
        // Start button (also creates the recording instance and opens the camera)
        return (
          <button 
            onClick={() => createRecording().then(rec => openCamera(rec.id).then(() => startRecording(rec.id)))}
            disabled={isUploading}
            style={buttonStyle}
          >
            Start Recording
          </button>
        );
      case 'recording':
        // Stop button
        return (
          <button 
            onClick={() => stopRecording(recordingId)}
            style={{ ...buttonStyle, backgroundColor: '#dc3545' }} // Red color for Stop
          >
            Stop Recording
          </button>
        );
      case 'stopped':
        // Buttons to upload or try again (cancel)
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleUpload}
              disabled={isUploading}
              style={{ ...buttonStyle, backgroundColor: '#28a745' }} // Green color for Upload
            >
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </button>
            <button 
              onClick={() => cancelRecording(recordingId)}
              disabled={isUploading}
              style={{ ...buttonStyle, backgroundColor: '#6c757d' }} // Gray color for Retry
            >
              Retry
            </button>
          </div>
        );
      case 'open':
        // State when camera is open but recording hasn't started yet (startRecording is called immediately above)
        return <p>Starting recording...</p>;
      default:
        return <p>Current Status: {status}</p>;
    }
  };
  
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white'
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '500px', margin: '20px auto', textAlign: 'center' }}>
      <h2>Video Recorder & Uploader</h2>
      
      <div style={{ margin: '20px 0' }}>
        {/* The component displays the video stream automatically based on the 'activeRecordings' state */}
        {activeRecordings.map(recording => (
          <div key={recording.id}>
            {/* Show webcam feed during 'idle'/'recording' */}
            {(recording.status === 'recording' || recording.status === 'open') && (
                <video ref={recording.webcamRef} autoPlay muted style={{ width: '100%', border: '2px solid blue' }} />
            )}
            {/* Show recorded preview after 'stopped' */}
            {recording.status === 'stopped' && (
                <video ref={recording.previewRef} controls style={{ width: '100%', border: '2px solid green' }} />
            )}
          </div>
        ))}

        {/* Display controls */}
        {renderControls()}
      </div>

      {/* Status messages */}
      <p style={{ marginTop: '10px', color: isUploading ? 'orange' : (message.includes('successful') ? 'green' : 'black') }}>
          **Status:** {message || (status && status.toUpperCase()) || 'INIT'}
      </p>
    </div>
  );
};

export default VideoRecorder;