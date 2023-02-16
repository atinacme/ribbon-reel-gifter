import React, { useEffect, useState } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import axios from 'axios';
import Webcam from 'react-webcam';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GifterSteps from './Pages/GifterSteps';
import Landing from './Pages/Landing';

function App() {
  const [orderId, setOrderId] = useState();
  const [message, setMessage] = useState();
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  // const arr = [
  //   {img:modal1,title:"First, you buy a gift from one of our gift partners",para:"If you are reading this, you've already purchased a gift from a store that works with RibbonReel."},
  //   {img:modal2,title:"After buy the gift, you will record your video message.",para:"If you are reading this, you've already purchased a gift from a store that works with RibbonReel."},
  //   {img:modal3,title:"3, you buy a gift from one of our gift partners",para:"If you are reading this, you've already purchased a gift from a store that works with RibbonReel."}
  // ]

  useEffect(() => {
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      console.log("Key is: " + pair[0]);
      console.log("Value is: " + pair[1]);
      setOrderId(pair[1]);
    }
  }, []);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleAddVideo = async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      blob.lastModifiedDate = new Date();
      blob.name = "react-webcam-stream-capture.webm";
      console.log('record--->', blob);
      var formData = new FormData();
      formData.append('order_id', orderId);
      formData.append('file', blob);
      const response = await axios({
        method: 'POST',
        url: 'https://ribbon-reel-backend.herokuapp.com/api/file/upload',
        data: formData,
      });
      if (response) {
        setMessage('Video Message Added Successfully');
      }
      setRecordedChunks([]);
    }
  };
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/giftersteps" element={<GifterSteps />} />
      </Routes>
      </BrowserRouter>
      {/* <Webcam audio={true} ref={webcamRef} />
      {capturing ? (
        <button onClick={handleStopCaptureClick}>Stop Capture</button>
      ) : (
        <button onClick={handleStartCaptureClick}>Start Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <>
          <button onClick={handleAddVideo}>Add Video</button>
          <p>{message}</p>
        </>
      )} */}
    </div>
  );
}

export default App;
