import React, { useEffect, useState } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useSelector } from 'react-redux';

export default function CameraVideo() {
    const state = useSelector((state) => state);
    const orderId = state.cameraVideoPage.order_id;
    const [videoStatus, setVideoStatus] = useState(false);
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

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
            formData.append('order_id', state.cameraVideoPage.order_id);
            formData.append('sender_name', state.landingPage.gifter_name);
            formData.append('receiver_email', state.gifterStepsPage.receiver_email);
            formData.append('receiver_name', state.gifterStepsPage.receiver_name);
            formData.append('file', blob);
            const url = process.env.NODE_ENV === 'production' ? 'https://ribbon-reel-backend.herokuapp.com/api/file/upload' :
                'http://localhost:8080/api/file/upload';
            const response = await axios({
                method: 'POST',
                url: url,
                data: formData
            });
            if (response) {
                setVideoStatus(true);
            }
            setRecordedChunks([]);
        }
    };
    return (
        <>
            {!videoStatus?
                <>
                    <Webcam audio={true} ref={webcamRef} />
                    {capturing ? (
                        <button onClick={handleStopCaptureClick}>Stop Capture</button>
                    ) : (
                        <button onClick={handleStartCaptureClick}>Start Capture</button>
                    )}
                    {recordedChunks.length > 0 && (
                        <>
                            <button onClick={handleAddVideo}>Add Video</button>

                        </>
                    )}
                </>
                :
                <p style={{color: '#fff', fontSize: '20px'}}>Video Message Added Successfully</p>
            }
        </>
    );
}
