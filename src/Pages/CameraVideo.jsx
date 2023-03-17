import React, { useEffect, useState } from 'react';
import '@shopify/polaris/build/esm/styles.css';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useSelector } from 'react-redux';
import videologo from "../assets/video_logo.png";
import logo from "../assets/recepientlogo.png";
import thumb from "../assets/thumbnail.png";
import relatedvideo from "../assets/relatedvideo.png";
import arrowright from "../assets/arrow-right.png";
import GiftWrap from "../assets/GiftWrap.png";
import ribbonheader from "../assets/ribbonheader.png";
import bgimg from "../assets/bg.png";
import edit from "../assets/edit.png";
import footerlogo from "../assets/footerlogo.png";

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
            var formData = new FormData();
            formData.append('order_id', state.cameraVideoPage.order_id);
            formData.append('send_by', 'gifter');
            formData.append('sender_name', state.landingPage.gifter_name);
            formData.append('sender_email', state.landingPage.gifter_email);
            formData.append('sender_phone', state.landingPage.gifter_phone);
            formData.append('receiver_contact', state.gifterStepsPage.receiver_contact);
            formData.append('receiver_contact_type', state.gifterStepsPage.receiver_contact_type);
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
            <div className='video_container '>
                <div className='video_wrapper  '>
                    {!videoStatus ?
                        <>
                            <div className="recepient-header">
                                <img src={videologo} alt="" />
                                <div className='video_timing'>60s</div>
                                <div className="close">✕</div>

                            </div>
                            <Webcam audio={false} ref={webcamRef} />
                            <div className='cta_wrapper'>
                                {capturing ? (
                                    <button className='finsh_cta sfr' onClick={handleStopCaptureClick}>Finish</button>
                                ) : (
                                    <button className='add_cta' onClick={handleStartCaptureClick}></button>
                                )}
                                {recordedChunks.length > 0 && (
                                    <>
                                        <button className='finsh_cta sfr' onClick={handleAddVideo}>Add Video</button>

                                    </>
                                )}
                            </div>
                        </>
                        :
                        <p style={{ color: '#fff', fontSize: '20px' }}>Video Message Added Successfully</p>
                    }
                </div>
                <div className='video_upload hide'>
                    <h2 className='e1b txt28'>Uploading...</h2>
                </div>
            </div>
            {/* <div className='gifterRecord hide'>
                <div className="recepient-header">
                    <img src={logo} alt="" />
                    <div className="num_wrap"><span>/5</span></div>
                </div>
                <div className='giftRecord_content'>
                    <p className='e1b txt22'>And, Scene!</p>
                    <h2 className='e1b'>Let’s Review</h2>
                    <div className='video_content'>
                        <div className='video_wrap'>
                            <video width="640" height="360" controls>
                                <source src="myvideo.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <img src={thumb} alt="" className='thumb' />
                        <br></br>
                        <img src={relatedvideo} alt="" className='record' />
                        <button className="e2b txt20">Continue <img src={arrowright} alt="" /></button>
                    </div>
                </div>
            </div>
            <div className='review_wrapper'>
                <div className="recepient-header">
                    <img src={logo} alt="" />
                    <div className="num_wrap"><span>/5</span></div>
                </div>
                <div className='review_content'>
                    <span className='e1b txt28'>That's a wrap! </span>
                    <h2 className='e1b'>Sebastian is gonna love it!</h2>
                    <p className='e1r txt20'>Review your Ribbon Reel</p>
                    <div className='animation-step10 step'>
                        <div className='animation10-phone'>
                            <div className='animation10_wrapper'>
                                <div className='animation-step10_img'>
                                    <img src={bgimg} alt='bgimg' />
                                </div>
                                <div className="video-wrap">
                                    <video width="640" height="360" controls>
                                        <source src="myvideo.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                            <div className='animation-step10_descrbtion'>
                                <div className='thum_img'>
                                    <img src={thumb} alt="" />
                                    <br></br>
                                    <img src={relatedvideo} alt="" />
                                </div>
                                <form>
                                    <div className='label_wrap'>
                                        <label className='e1b txt20'>
                                            From
                                            <input type="text" placeholder='Alex' className='txt28' />
                                        </label>
                                        <img src={edit} alt="" />
                                    </div>
                                    <div className='label_wrap'>
                                        <label className='e1b txt20'>
                                            To
                                            <input type="text" placeholder='Sebastian' className='txt28' />
                                        </label>
                                        <img src={edit} alt="" />
                                    </div>
                                    <div><p className='e1b'>sebastianemail@gmail.com</p></div>
                                    <button className='e1b txt20'>Send!</button>
                                </form>
                            </div>

                        </div>

                        <div className='animation10-desktop'>
                            <div className='animation10-desktop_wrapper'>
                                <div className='animation-step10_img'>
                                    <img src={GiftWrap} alt='bgimg' />
                                    <div className="video-wrap">
                                        <video width="640" height="360" controls>
                                            <source src="myvideo.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className='thum_img'>
                                        <img src={thumb} alt="" />
                                        <br></br>
                                        <img src={relatedvideo} alt="" />
                                    </div>
                                </div>
                                <div className='animation-step10_descrbtion'>
                                    <form>
                                        <div>
                                            <label className='e1b txt20'>
                                                From
                                                <input type="text" placeholder='Alex' className='txt28' />
                                            </label>
                                            <img src={edit} alt="" />
                                        </div>
                                        <div>
                                            <label className='e1b txt20'>
                                                To
                                                <input type="text" placeholder='Sebastian' className='txt28' />
                                            </label>
                                            <img src={edit} alt="" />
                                        </div>
                                        <div><p className='e1b'>sebastianemail@gmail.com</p></div>
                                        <button className='e1b txt20'>Send!</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='review_footer'>
                        <img src={footerlogo} alt="" />
                        <p className='sfr txt14'>© 2022 RibbonReel. All rights reserved.</p>
                        <p className='sfr txt14'>Privacy Policy </p>
                    </div>
                </div>
            </div>
            <div className='mobile_recording-step1'>
                <div className='record_video-wrap'>
                    <video width="640" height="360" controls>
                        <source src="myvideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='videoanimation'>
                    
                </div>
            </div> */}
        </>
    );
}
