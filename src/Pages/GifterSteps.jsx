import React from "react";
import logo from "../assets/recepientlogo.png";
import logonum from "../assets/logonum.png";
import Arrowright from "../assets/Arrowright.png";
import arrowright from "../assets/arrow-right.png";
import note from "../assets/note.png";

function GifterSteps() {
    return (
        <>
            <div className="recepient_wrapper">
                <div className="recepient-header">
                    <img src={logo} alt="" />
                    <img src={logonum} alt="" />
                </div>
                <div className="recepient-content">
                    <a href=""><img src={Arrowright} />Back</a>
                    <h3 className="e1r txt28"><strong>Alex,</strong> to whom are you sending the video?</h3>
                    <input type="text" placeholder="Type your friend's name" className="e2r" />
                    <a href="" className="e2b txt20 continue-cta">Continue <img src={arrowright} alt="" /></a>
                </div>

                <div className="recepient-content contact hide">
                    <a href=""><img src={Arrowright} />Back</a>
                    <h3 className="e1r txt28">Tell us where to send <strong>Sebastian</strong> the video?</h3>
                    <input type="text" placeholder="Type their cellphone" className="e2r" />
                    <span className="e2b txt20">Use email instead</span>
                    <a href="" className="e2b txt20 continue-cta">Continue <img src={arrowright} alt="" /></a>
                </div>
            </div>
            <div className="record_video-wrapper hide">
                <div className="recepient-header">
                    <img src={logo} alt="" />
                    <img src={logonum} alt="" />
                </div>
                <div className="video_content">
                    <a href=""><img src={Arrowright} />Back</a>
                    <h2 className="e1b">Let’s get the camera rolling</h2>
                    <a href=""><img src={note} alt="" /></a>
                    <p className="e1sb txt20">If you accidentally close this window before you hit the Finish button, you will need to record your video again.</p>
                    <a href="" className="e2b txt20 recording-cta">Continue to Recording <img src={arrowright} alt="" /></a>
                </div>
            </div>
        </>
    );
}
export default GifterSteps;