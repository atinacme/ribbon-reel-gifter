import React, { useEffect, useState } from "react";
import logo from "../assets/recepientlogo.png";
import Arrowright from "../assets/Arrowright.png";
import arrowright from "../assets/arrow-right.png";
import note from "../assets/note.png";
import { useNavigate } from 'react-router-dom';
import desk from "../assets/desk.png";
import { useDispatch, useSelector } from "react-redux";
import { GifterStepsPageAction } from "../redux/Actions";
import { Country } from 'country-state-city';
import Select from 'react-select';

function GifterSteps() {
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [gifterName, setGifterName] = useState(state.landingPage.gifter_name);
    const [gifterAdded, setGifterAdded] = useState(state.landingPage.gifter_name === '' ? false : true);
    const newGifter = state.landingPage.gifter_name === '' ? true : false;
    const [recepientAddress, setRecepientAddress] = useState(true)
    const [step1, setStep1] = useState(true);
    const [step1Complete, setStep1Complete] = useState(true);
    const [step21, setStep21] = useState(false);
    const [step22, setStep22] = useState(false);
    const [step1Term, setStep1Term] = useState("");
    const [step2Term, setStep2Term] = useState("");
    const [stepCount, setStepCount] = useState(1);
    const countryList = Country.getAllCountries().map(v => ({ ...v, 'value': "+" + " " + (v.phonecode) + " " + v.name, 'label': "+" + " " + "(" + v.phonecode + ")" + " " + v.name }))
    const [selectedOption, setSelectedOption] = useState(null);

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
                        <div className="num_wrap">
                            <span>{stepCount}/5</span>
                        </div>
                    </div>
                    {!gifterAdded && (
                        <div className="recepient-content">
                            <div className="contact-wrapper">
                                <div className="contact-content">
                                    <h3 className="e1r txt28">What's your name?</h3>
                                    <input type="text" value={gifterName} onChange={(e) => setGifterName(e.target.value)} placeholder="Type your name" className="e2r" />
                                    <button className="e2b txt20 continue-cta" onClick={() => {
                                        setGifterAdded(true); setStep1(true); setStepCount(2);
                                    }}>Continue<img src={arrowright} alt="" /></button>
                                </div>
                                <div className="contact-img">
                                    <img src={desk} alt="" />
                                </div>
                            </div>
                        </div>
                    )}
                    {gifterAdded && (
                        <>
                            {step1 ?
                                <div className="recepient-content">
                                    <div className="contact-wrapper">
                                        {newGifter ?
                                            <div className="contact-content">
                                                {/* <button onClick={() => { setGifterAdded(false); setStepCount(1); }}><img src={Arrowright} alt="" />Back</button> */}
                                                <h3 className="e1r txt28">Nice to meet you, <strong>{gifterName}! </strong>To whom are you sending the video?</h3>
                                                <input type="text" value={step1Term} onChange={(e) => setStep1Term(e.target.value)} placeholder="Type your friend's name" className="e2r" />
                                                <button className="e2b txt20 continue-cta" onClick={() => { setStep1(false); setStepCount(3); }}>Continue<img src={arrowright} alt="" /></button>
                                            </div>
                                            :
                                            <div className="contact-content">
                                                {/* <button onClick={() => navigate("/")}><img src={Arrowright} alt="" />Back</button> */}
                                                <h3 className="e1r txt28"><strong>{gifterName}, </strong>to whom are you sending the video?</h3>
                                                <input type="text" value={step1Term} onChange={(e) => setStep1Term(e.target.value)} placeholder="Type your friend's name" className="e2r" />
                                                <button className="e2b txt20 continue-cta" onClick={() => {
                                                    setStep1(false);
                                                    setStepCount(2);
                                                    dispatch(GifterStepsPageAction(step1Term, state.gifterStepsPage.receiver_contact, state.gifterStepsPage.receiver_contact_type))
                                                }}>Continue<img src={arrowright} alt="" /></button>
                                            </div>
                                        }
                                        <div className="contact-img">
                                            <img src={desk} alt="" />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="recepient-content contact">
                                    <div className="contact-wrapper">
                                        <div className="contact-content">
                                            <button onClick={() => {
                                                setStep1(true);
                                                if (!newGifter) {
                                                    setStepCount(1);
                                                } else {
                                                    setStepCount(2);
                                                }
                                            }}>
                                                <img src={Arrowright} alt="" />
                                                Back
                                            </button>
                                            <h3 className="e1r txt28">Tell us where to send <strong>{step1Term}</strong> the video?</h3>
                                            {recepientAddress ?
                                                <>
                                                    <input type="email" value={step2Term} onChange={(e) => setStep2Term(e.target.value)} placeholder="Type their email" className="e2r" />
                                                    <span className="e2b txt20" onClick={() => {
                                                        setRecepientAddress(!recepientAddress)
                                                        dispatch(GifterStepsPageAction(state.gifterStepsPage.receiver_name, state.gifterStepsPage.receiver_contact, 'phone'))
                                                    }}>Use phone instead</span>
                                                </>
                                                :
                                                <>
                                                    <Select
                                                        defaultValue={selectedOption}
                                                        onChange={setSelectedOption}
                                                        options={countryList}
                                                        classNames={{
                                                            control: (state) =>
                                                                state.isFocused ? 'border-red-600' : 'border-grey-300',
                                                        }}
                                                    />
                                                    <input type="number" minLength={10} maxLength={10} value={step2Term} onChange={(e) => setStep2Term(e.target.value)} placeholder="Type their cellphone" className="e2r" />
                                                    <span className="e2b txt20" onClick={() => {
                                                        setRecepientAddress(!recepientAddress)
                                                        dispatch(GifterStepsPageAction(state.gifterStepsPage.receiver_name, state.gifterStepsPage.receiver_contact, 'email'))
                                                    }}>Use email instead</span>
                                                </>
                                            }
                                            <button className="e2b txt20 continue-cta" onClick={() => {
                                                setStep1Complete(false);
                                                if (!newGifter) {
                                                    setStepCount(3);
                                                } else {
                                                    setStepCount(4);
                                                }
                                                if (recepientAddress) {
                                                    dispatch(GifterStepsPageAction(state.gifterStepsPage.receiver_name, step2Term, state.gifterStepsPage.receiver_contact_type))
                                                } else {
                                                    dispatch(GifterStepsPageAction(state.gifterStepsPage.receiver_name, "+" + selectedOption.phonecode + step2Term, state.gifterStepsPage.receiver_contact_type))
                                                }
                                            }}>
                                                Continue <img src={arrowright} alt="" />
                                            </button>
                                        </div>
                                        <div className="contact-img">
                                            <img src={desk} alt="" />
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    )}
                </div>
                :
                <div className="record_video-wrapper">
                    <div className="recepient-header">
                        <img src={logo} alt="" />
                        <div className="num_wrap"><span>{stepCount}/5</span></div>
                    </div>
                    <div className="video_content">
                        <div className="contact-wrapper">
                            <div className="contact-content">
                                <button onClick={() => {
                                    setStep1Complete(true);
                                    setStep1(false);
                                    if (!newGifter) {
                                        setStepCount(2);
                                    } else {
                                        setStepCount(3);
                                    }
                                }}>
                                    <img src={Arrowright} alt="" />
                                    Back
                                </button>

                                
                                <h2 className="e1b txt48">Let’s get the camera rolling</h2>
                                {step21 && (
                                    <>
                                        <button><img src={note} alt="" /></button>
                                        <p className="e1sb txt20">If you accidentally close this window before you hit the Finish button, you will need to record your video again.</p>
                                    </>
                                )}
                                {step22 && (
                                    <button className="e2b txt20 recording-cta" onClick={() => navigate("/cameravideo")}>Continue to Recording <img src={arrowright} alt="" /></button>
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