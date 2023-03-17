import { GIFTER_STEPS_ITEM } from "../Types";

const initialState = {
    receiver_name: '',
    receiver_contact: '',
    receiver_contact_type: 'email'
};

export function GifterStepsPageReducer(state = initialState, action) {
    switch (action.type) {
        case GIFTER_STEPS_ITEM:
            return {
                ...state,
                receiver_name: action.receiver_name,
                receiver_contact: action.receiver_contact,
                receiver_contact_type: action.receiver_contact_type
            };
        default:
            return state;
    }
};