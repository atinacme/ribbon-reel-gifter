import { CAMERA_VIDEO_ITEM, GIFTER_STEPS_ITEM, LANDING_PAGE_ITEM } from "./Types";

export const CameraVideoPageAction = (order_id) => {
    return {
        type: CAMERA_VIDEO_ITEM, order_id
    };
};

export const LandingPageAction = (gifter_name, gifter_email, gifter_phone) => {
    return {
        type: LANDING_PAGE_ITEM, gifter_name, gifter_email, gifter_phone
    };
};

export const GifterStepsPageAction = (receiver_name, receiver_contact, receiver_contact_type) => {
    return {
        type: GIFTER_STEPS_ITEM, receiver_name, receiver_contact, receiver_contact_type
    };
};