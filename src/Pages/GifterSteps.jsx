import React, { useEffect, useState } from "react";
import logo from "../assets/recepientlogo.png";
import logonum from "../assets/logonum.png";
import Arrowright from "../assets/Arrowright.png";
import arrowright from "../assets/arrow-right.png";
import note from "../assets/note.png";
import { useNavigate } from 'react-router-dom';
import desk from "../assets/desk.png";

function GifterSteps() {
    const navigate = useNavigate();
    const [step1, setStep1] = useState(true);
    const [step1Complete, setStep1Complete] = useState(true);
    const [step21, setStep21] = useState(false);
    const [step22, setStep22] = useState(false);
    const [step1Term, setStep1Term] = useState("");
    const [step2Term, setStep2Term] = useState("");

    useEffect(() => {
        if (!step1Complete) {
            const interval = setInterval(() => { setStep21(true); }, 1000);
            return () => clearInterval(interval);
        }
    }, [step1Complete]);

    useEffect(() => {
        if (step21) {
            const interval = setInterval(() => { setStep22(true); }, 1000);
            return () => clearInterval(interval);
        }
    }, [step21]);

    return (
        <>
            {step1Complete ?
                <div className="recepient_wrapper">
                    <div className="recepient-header">
                        <img src={logo} alt="" />
                        <img src={logonum} alt="" />
                    </div>
                    {step1 ?
                        <div className="recepient-content">
                            <div className="contact-wrapper">
                                <div className="contact-content">
                                    <a onClick={() => navigate("/")}><img src={Arrowright} />Back</a>
                                    <h3 className="e1r txt28"><strong>Alex,</strong>to whom are you sending the video?</h3>
                                    <input type="text" value={step1Term} onChange={(e) => setStep1Term(e.target.value)} placeholder="Type your friend's name" className="e2r" />
                                    <a className="e2b txt20 continue-cta" onClick={() => setStep1(false)}>Continue<img src={arrowright} alt="" /></a>
                                </div>

                                <div className="contact-img">
                                    <img src={desk} alt="" />
                                </div>
                            </div>
                        </div>
                        :
                        <div className="recepient-content contact">
                            <div className="contact-wrapper">
                                <div className="contact-content">
                                    <a onClick={() => setStep1(true)}><img src={Arrowright} />Back</a>
                                    <h3 className="e1r txt28">Tell us where to send <strong>{step1Term}</strong> the video?</h3>
                                    <input type="number" minLength={10} maxLength={10} value={step2Term} onChange={(e) => setStep2Term(e.target.value)} placeholder="Type their cellphone" className="e2r" />
                                    <span className="e2b txt20">Use email instead</span>
                                    <a className="e2b txt20 continue-cta" onClick={() => { setStep1Complete(false); }}>Continue <img src={arrowright} alt="" /></a>
                                </div>
                                <div className="contact-img">
                                    <img src={desk} alt="" />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <div className="record_video-wrapper">
                    <div className="recepient-header">
                        <img src={logo} alt="" />
                        <img src={logonum} alt="" />
                    </div>
                    <div className="video_content">
                        <div className="contact-wrapper">
                            <div className="contact-content">
                                <a onClick={() => { setStep1Complete(true); setStep1(false); }}><img src={Arrowright} />Back</a>
                                <h2 className="e1b txt48">Let’s get the camera rolling</h2>
                                {step21 && (
                                    <>
                                        <a><img src={note} alt="" /></a>
                                        <p className="e1sb txt20">If you accidentally close this window before you hit the Finish button, you will need to record your video again.</p>
                                    </>
                                )}
                                {step22 && (
                                    <a className="e2b txt20 recording-cta" onClick={() => navigate("/cameravideo")}>Continue to Recording <img src={arrowright} alt="" /></a>
                                )}
                            </div>
                      
                        <div className="contact-img">
                            <img src={desk} alt="" />
                        </div>
                    </div>
                    </div>
                </div>
            }
        </>
    );
}
export default GifterSteps;