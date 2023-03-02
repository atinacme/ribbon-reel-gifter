import { combineReducers } from "redux";
import { CameraVideoPageReducer } from "./CameraVideoPageReducer";
import { GifterStepsPageReducer } from "./GifterStepsPageReducer";
import { LandingPageReducer } from "./LandingPageReducer";

const rootReducer = combineReducers({
    cameraVideoPage: CameraVideoPageReducer,
    landingPage: LandingPageReducer,
    gifterStepsPage: GifterStepsPageReducer
});

export default rootReducer;
