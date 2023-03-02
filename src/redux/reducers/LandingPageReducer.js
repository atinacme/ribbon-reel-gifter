import { LANDING_PAGE_ITEM } from "../Types";

const initialState = {
    gifter_name: ''
};

export function LandingPageReducer(state = initialState, action) {
    switch (action.type) {
        case LANDING_PAGE_ITEM:
            return {
                ...state,
                gifter_name: action.gifter_name
            };
        default:
            return state;
    }
};