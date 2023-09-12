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
import videoplay from "../assets/videoplay.png";
import downloadimg from "../assets/download_img.png";
import tickIcon from "../assets/tickIcon.png";
import ribbonsvg from "../assets/Ribbon-svg.png";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import bgimg1 from "../assets/bg-img.jpg";
import threadopen from "../assets/threadtop.svg";
import checkion from "../assets/Icon.png";

export default function CameraVideo() {
    const state = useSelector((state) => state);
    const orderId = state.cameraVideoPage.order_id;
    const [completeVideo, setCompleteVideo] = useState(false);
    const [videoStatus, setVideoStatus] = useState(false);
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [uploading, setUploading] = useState();
    const [reviewStep1, setReviewStep1] = useState(true);
    const [reviewStep2, setReviewStep2] = useState(false);
    const [reviewStep3, setReviewStep3] = useState(false);
    const [reviewStep4, setReviewStep4] = useState(false);
    const [reviewStep5, setReviewStep5] = useState(false);
    const [reviewStep6, setReviewStep6] = useState(false);
    const [blob, setBlob] = useState();
    const [videoSend, setVideoSend] = useState();
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
            setBlob(URL.createObjectURL(blob));
            blob.lastModifiedDate = new Date();
            blob.name = "react-webcam-stream-capture.webm";
            setVideoStatus(true);
            setUploading(false);
            setTimeout(() => setUploading(true), 1000);
            setTimeout(() => setCompleteVideo(true), 1500);
        }
    };

    const handleSendVideo = async () => {
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
            const url = `${process.env.REACT_APP_BASE_URL}/file/upload`;
            try {
                const response = await axios({
                    method: 'POST',
                    url: url,
                    data: formData
                });
                if (response) {
                    setVideoSend(true);
                }
                setRecordedChunks([]);
            } catch (e) {
                console.log(e);
                // setVideoSend(false);
            }
        }
    };

    useEffect(() => {
        if (!reviewStep1 && !reviewStep2 && reviewStep3 && !reviewStep4 && !reviewStep5 && !reviewStep6) {
            setTimeout(() => {
                setReviewStep1(false);
                setReviewStep2(false);
                setReviewStep3(false);
                setReviewStep4(true);
                setReviewStep5(false);
                setReviewStep6(false);
            }, 10000);
        }
        if (!reviewStep1 && !reviewStep2 && !reviewStep3 && reviewStep4 && !reviewStep5 && !reviewStep6) {
            setTimeout(() => {
                setReviewStep1(false);
                setReviewStep2(false);
                setReviewStep3(false);
                setReviewStep4(false);
                setReviewStep5(true);
                setReviewStep6(false);
            }, 2000);
        }
        if (!reviewStep1 && !reviewStep2 && !reviewStep3 && !reviewStep4 && reviewStep5 && !reviewStep6) {
            setTimeout(() => {
                setReviewStep1(false);
                setReviewStep2(false);
                setReviewStep3(false);
                setReviewStep4(false);
                setReviewStep5(false);
                setReviewStep6(true);
            }, 2000);
        }
    });
    return (
        <>
            {!completeVideo ?
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
                            <>
                                {!uploading ?
                                    <div className='video_upload'>
                                        <h2 className='e1b txt28'>Uploading...</h2>
                                    </div>
                                    :
                                    <div className='video_uploaded'>
                                        <h2 className='e1b txt28'>Uploaded <img src={checkion} alt="tickicon" className='uploadedicon' /></h2>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
                :
                <>
                    {reviewStep1 && !reviewStep2 && !reviewStep3 && !reviewStep4 && !reviewStep5 && !reviewStep6 ?
                        <div className='gifterRecord'>
                            <div className="recepient-header">
                                <img src={logo} alt="" />
                                <div className="num_wrap"><span>5/5</span></div>
                            </div>
                            <div className='giftRecord_content'>
                                <p className='e1b txt22'>And, Scene!</p>
                                <h2 className='e1b'>Let’s Review</h2>
                                <div className='video_content'>
                                    <div className='video_wrap' onClick={() => {
                                        document.getElementById("blob_video").play();
                                    }} >
                                        <video id='blob_video' width="640" height="360" controls>
                                            <source src={blob} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    {/* <img src={thumb} alt="" className='thumb' /> */}
                                    <br></br>
                                    {videoSend === undefined ? <img src={relatedvideo} alt="" className='record' onClick={() => window.location.reload()} /> : null}
                                    <button className="e2b txt20" onClick={() => {
                                        if (videoSend === true) {
                                            setReviewStep1(false);
                                            setReviewStep2(false);
                                            setReviewStep3(false);
                                            setReviewStep4(false);
                                            setReviewStep5(false);
                                            setReviewStep6(true);
                                        } else {
                                            setReviewStep1(false);
                                            setReviewStep2(true);
                                            setReviewStep3(false);
                                            setReviewStep4(false);
                                            setReviewStep5(false);
                                            setReviewStep6(false);
                                        }
                                    }} >Continue <img src={arrowright} alt="" /></button>
                                </div>
                            </div>
                        </div>
                        : !reviewStep1 && reviewStep2 && !reviewStep3 && !reviewStep4 && !reviewStep5 && !reviewStep6 ?
                            <div className='review_wrapper'>
                                <div className="recepient-header">
                                    <img src={logo} alt="" />
                                    <div className="num_wrap"><span>4/5</span></div>
                                </div>
                                <div className='review_content'>
                                    <span className='e1b txt28'>That's a wrap! </span>
                                    <h2 className='e1b'>{state.gifterStepsPage.receiver_name} is gonna love it!</h2>
                                    <p className='e1r txt20'>Review your Ribbon Reel</p>
                                    <div className='animation-step10 step'>
                                        <div className='animation10-phone'>
                                            <div className='animation10_wrapper'>
                                                <div className='animation-step10_img'>
                                                    <img src={bgimg} alt='bgimg' />
                                                </div>
                                                <div className="video-wrap" onClick={() => {
                                                    document.getElementById("blob_video").play();
                                                }}>
                                                    <video id='blob_video' width="640" height="360" controls>
                                                        <source src={blob} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </div>
                                            </div>
                                            <div className='animation-step10_descrbtion'>
                                                <div className='thum_img'>
                                                    {/* <img src={thumb} alt="" /> */}
                                                    <br></br>
                                                    <img src={relatedvideo} alt="" onClick={() => window.location.reload()} />
                                                </div>
                                                <form>
                                                    <div className='label_wrap'>
                                                        <label className='e1b txt20'>
                                                            From
                                                            <input type="text" placeholder={state.landingPage.gifter_name} className='txt28' />
                                                        </label>
                                                        <img src={edit} alt="" />
                                                    </div>
                                                    <div className='label_wrap'>
                                                        <label className='e1b txt20'>
                                                            To
                                                            <input type="text" placeholder={state.gifterStepsPage.receiver_name} className='txt28' />
                                                        </label>
                                                        <img src={edit} alt="" />
                                                    </div>
                                                    <div><p className='e1b'>{state.gifterStepsPage.receiver_contact}</p></div>
                                                    <button className='e1b txt20' onClick={() => {
                                                        setReviewStep1(false);
                                                        setReviewStep2(false);
                                                        setReviewStep3(true);
                                                        setReviewStep4(false);
                                                        setReviewStep5(false);
                                                        setReviewStep6(false);
                                                        handleSendVideo();
                                                    }}>Send!</button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className='animation10-desktop'>
                                            <div className='animation10-desktop_wrapper'>
                                                <div className='animation-step10_img'>
                                                    <img src={GiftWrap} alt='bgimg' />
                                                    <div className="video-wrap" onClick={() => {
                                                        document.getElementById("blob_video").play();
                                                    }}>
                                                        <video id='blob_video' width="640" height="360" controls>
                                                            <source src={blob} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                    <div className='thum_img'>
                                                        {/* <img src={thumb} alt="" /> */}
                                                        <br></br>
                                                        <img src={relatedvideo} alt="" onClick={() => window.location.reload()} />
                                                    </div>
                                                </div>
                                                <div className='animation-step10_descrbtion'>
                                                    <form>
                                                        <div>
                                                            <label className='e1b txt20'>
                                                                From
                                                                <input type="text" placeholder={state.landingPage.gifter_name} className='txt28' />
                                                            </label>
                                                            <img src={edit} alt="" />
                                                        </div>
                                                        <div>
                                                            <label className='e1b txt20'>
                                                                To
                                                                <input type="text" placeholder={state.gifterStepsPage.receiver_name} className='txt28' />
                                                            </label>
                                                            <img src={edit} alt="" />
                                                        </div>
                                                        <div><p className='e1b'>{state.gifterStepsPage.receiver_contact}</p></div>
                                                        <button className='e1b txt20' onClick={() => {
                                                            setReviewStep1(false);
                                                            setReviewStep2(false);
                                                            setReviewStep3(true);
                                                            setReviewStep4(false);
                                                            setReviewStep5(false);
                                                            setReviewStep6(false);
                                                            handleSendVideo();
                                                        }}>Send!</button>
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
                            : !reviewStep1 && !reviewStep2 && reviewStep3 && !reviewStep4 && !reviewStep5 && !reviewStep6 ?
                                <div className='mobile_recording-step1'>
                                    <div className="animation1">
                                        <div className="bg-img">
                                            <video id='blob_video' width="640" height="360" controls>
                                                <source src={blob} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <div id="cf4" className="animationshadow">
                                            <img src={ribbonsvg} className='silderight' />
                                            <img src={p1} />
                                            <img src={p2} />
                                            <img src={p3} />
                                            <img src={p3} />
                                        </div>
                                    </div>
                                </div>
                                : !reviewStep1 && !reviewStep2 && !reviewStep3 && reviewStep4 && !reviewStep5 && !reviewStep6 ?
                                    <div className='mobile_reaction'>
                                        <div className='reaction_icons'>
                                            <form>
                                                <div>
                                                    <label className='e1b txt20'>
                                                        From
                                                        <input type="text" placeholder={state.landingPage.gifter_name} className='txt28' />
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className='e1b txt20'>
                                                        To
                                                        <input type="text" placeholder={state.gifterStepsPage.receiver_name} className='txt28' />
                                                    </label>
                                                </div>
                                                <div className='send_wrapper'> <p className='e2b txt20'>Send!</p><img src={tickIcon} alt="tickicon" /></div>
                                            </form>
                                        </div>
                                    </div>
                                    : !reviewStep1 && !reviewStep2 && !reviewStep3 && !reviewStep4 && reviewStep5 && !reviewStep6 ?
                                        <div className='mobile_reaction'>
                                            <div className="recepient-header">
                                                <img src={logo} alt="" />
                                            </div>
                                            <div className='reaction_content'>
                                                <h2 className='e1b txt48'>We can't wait to see {state.gifterStepsPage.receiver_name}'s Reaction!</h2>
                                                <p className='e1r txt16'>{state.gifterStepsPage.receiver_name} can only watch your message when the gift delivers.</p>
                                            </div>
                                            <div className='reaction_icons'>
                                                <ul>
                                                    <li className='e2b' onClick={() => {
                                                        setReviewStep1(true);
                                                        setReviewStep2(false);
                                                        setReviewStep3(false);
                                                        setReviewStep4(false);
                                                        setReviewStep5(false);
                                                        setReviewStep6(false);
                                                    }}><img src={videoplay} />Preview</li>
                                                    <a href={blob} download="video.mp4"><li className='e2b'><img src={downloadimg} />Download</li></a>
                                                </ul>
                                                <form>
                                                    <div>
                                                        <label className='e1b txt20'>
                                                            From
                                                            <input type="text" placeholder={state.landingPage.gifter_name} className='txt28' />
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className='e1b txt20'>
                                                            To
                                                            <input type="text" placeholder={state.gifterStepsPage.receiver_name} className='txt28' />
                                                        </label>
                                                    </div>
                                                    <div className='send_wrapper'> <p className='e2b txt20'>Send!</p><img src={tickIcon} alt="tickicon" /></div>
                                                </form>
                                            </div>
                                        </div>
                                        : !reviewStep1 && !reviewStep2 && !reviewStep3 && !reviewStep4 && !reviewStep5 && reviewStep6 ?
                                            <div className='mobile_reaction'>
                                                <div className="recepient-header">
                                                    <img src={logo} alt="" />
                                                </div>
                                                <div className='reaction_content'>
                                                    <h2 className='e1b txt48'>We’re waiting for {state.gifterStepsPage.receiver_name} to watch the video</h2>
                                                    <p className='e1r txt16'>{state.gifterStepsPage.receiver_name} can only watch your message when the gift delivers.</p>
                                                </div>
                                                <div className='reaction_icons'>
                                                    <ul>
                                                        <li className='e2b' onClick={() => {
                                                            setReviewStep1(true);
                                                            setReviewStep2(false);
                                                            setReviewStep3(false);
                                                            setReviewStep4(false);
                                                            setReviewStep5(false);
                                                            setReviewStep6(false);
                                                        }}><img src={videoplay} />Preview</li>
                                                        <a href={blob} download="video.mp4"><li className='e2b'><img src={downloadimg} />Download</li></a>
                                                    </ul>
                                                    <form>
                                                        <div>
                                                            <label className='e1b txt20'>
                                                                From
                                                                <input type="text" placeholder={state.landingPage.gifter_name} className='txt28' />
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label className='e1b txt20'>
                                                                To
                                                                <input type="text" placeholder={state.gifterStepsPage.receiver_name} className='txt28' />
                                                            </label>
                                                        </div>
                                                        <div className='send_wrapper'> <p className='e2b txt20'>Send!</p><img src={tickIcon} alt="tickicon" /></div>
                                                    </form>
                                                </div>
                                            </div>
                                            :
                                            <div className='mobile_reaction'>
                                                <div className="recepient-header">
                                                    <img src={logo} alt="" />
                                                </div>
                                                <div className='reaction_content'>
                                                    <h2 className='e1b txt48'>YES! {state.gifterStepsPage.receiver_name} watched your message :D</h2>
                                                    <p className='e1r txt16'>{state.gifterStepsPage.receiver_name} can only watch your message when the gift delivers.</p>
                                                </div>
                                                <div className='reaction_icons'>
                                                    <ul>
                                                        <li className='e2b'><img src={videoplay} />Preview</li>
                                                        <li className='e2b'><img src={downloadimg} />Download</li>
                                                    </ul>
                                                    <form>
                                                        <div>
                                                            <label className='e1b txt20'>
                                                                From
                                                                <input type="text" placeholder={state.landingPage.gifter_name} className='txt28' />
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label className='e1b txt20'>
                                                                To
                                                                <input type="text" placeholder={state.gifterStepsPage.receiver_name} className='txt28' />
                                                            </label>
                                                        </div>
                                                        <div className='send_wrapper'> <p className='e2b txt20'>Send!</p><img src={tickIcon} alt="tickicon" /></div>
                                                    </form>
                                                </div>
                                            </div>
                    }
                </>
            }
        </>
    );
}
