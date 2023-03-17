import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GifterSteps from './Pages/GifterSteps';
import Landing from './Pages/Landing';
import CameraVideo from './Pages/CameraVideo';
import { Provider } from "react-redux";
import PersistedStore from "./redux/PersistedStore";

function App() {
  return (
    <div className="App">
      <Provider store={PersistedStore.getDefaultStore().store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/giftersteps" element={<GifterSteps />} />
            <Route path="/cameravideo" element={<CameraVideo />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
