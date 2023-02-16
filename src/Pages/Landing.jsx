import React, { useState } from 'react';
import brand from '../assets/Brand.png';
import modal1 from "../assets/modal1.png";
import modal2 from "../assets/modal2.png";
import modal3 from "../assets/modal3.png";
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import arrowright from '../assets/arrow-right.png'
import mark from "../assets/Mark.png";
import brand1 from "../assets/brandlogo.png";
import logotype from "../assets/Logotype.png";

export default function Landing() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const handleClose = () => {
        setShow(false);
        navigate("/giftersteps")
    }

    const handleShow = () => setShow(true);

    return (
        <>
        <div className='modal-container'>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-wrapper">
                            <div className="brand_img">
                                <img src={brand1} alt="" />
                                <h2 className="e1sb txt28 mb20 mt20">How gifting with RibbonReel Work?</h2>
                            </div>
                       
                        <div className="modal-content">
                            <div className="modal-content_wrap mt30">
                                <div className="modal_img"><img src={modal1} alt="" /></div>
                                <div className="modal_title e1r txt22 mt20 mb20">First, you <strong>buy a gift </strong>from one of our gift partners</div>
                                <div className="modal_para e1r txt16">If you are reading this, you've already purchased a gift from a store that works with RibbonReel.</div>
                            </div>
                            <div className="modal-content_wrap mt30">
                                <div className="modal_img"><img src={modal2} alt="" /></div>
                                <div className="modal_title e1r txt22 mt20 mb20">After buy the gift, you will <strong>record your video message.</strong></div>
                                <div className="modal_para e1r txt16">Don't worry, if you can't record your video at that moment, we will email you reminders to record your message before the gift delivers.</div>
                            </div>
                            <div className="modal-content_wrap mt30">
                                <div className="modal_img"><img src={modal3} alt="" /></div>
                                <div className="modal_title e1r txt22 mt20 mb20 "><strong>That it!</strong> We will send the video message once the gift delivers</div>
                                <div className="modal_para e1r txt16">You will choose between a phone number or email address to deliver the video message. The video can only be watch once the gift arrives!</div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <div className='e1r txt22 d w100'>More questions?</div>
                            <a href="" className='e2b txt20 mt10 mb10 d w100'>Visit our FAQ<img src={arrowright} alt="" /></a>
                            <div className='footer-bottom-sec w100'>
                                <div className='footer_img'>
                                <img src={mark} alt="" className='d' />
                                <img src={logotype} alt="" className='d ml10'/>
                                </div>                              
                                <span className='sfr txt14 d w100'>© 2022 RibbonReel. All rights reserved.</span>
                                <span className='sfr txt14 d w100'>Privacy Policy</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            </div>
            <div className='landing__wrapper'>
                <div className='landing_container'>
                    <div className='landing_img'>
                        <img src={brand} alt="" />
                    </div>
                    <div className='landing-content page-width'>
                        <div className='e1b txt48 mb20'>Alex!</div>
                        <div className='e2sb txt20 mt10'>Time to create a personalized  video message for your gift!</div>
                        <button className='e1b txt20 mt90 txt20' onClick={handleShow}>Let's Begin!</button>
                        {/* <a href={''} className='e1sb mt50 txt16'>How does it work?</a> */}
                    </div>
                </div>
            </div>
        </>
    );
}