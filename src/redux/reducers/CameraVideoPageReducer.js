import { CAMERA_VIDEO_ITEM } from "../Types";

const initialState = {
    order_id: ''
};

export function CameraVideoPageReducer(state = initialState, action) {
    switch (action.type) {
        case CAMERA_VIDEO_ITEM:
            return {
                ...state,
                order_id: action.order_id
            };
        default:
            return state;
    }
};