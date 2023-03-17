import { LANDING_PAGE_ITEM } from "../Types";

const initialState = {
    gifter_name: '',
    gifter_email: '',
    gifter_phone: ''
};

export function LandingPageReducer(state = initialState, action) {
    switch (action.type) {
        case LANDING_PAGE_ITEM:
            return {
                ...state,
                gifter_name: action.gifter_name,
                gifter_email: action.gifter_email,
                gifter_phone: action.gifter_phone
            };
        default:
            return state;
    }
};