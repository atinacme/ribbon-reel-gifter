import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GifterSteps from './Pages/GifterSteps';
import Landing from './Pages/Landing';
import CameraVideo from './Pages/CameraVideo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/giftersteps" element={<GifterSteps />} />
          <Route path="/cameravideo" element={<CameraVideo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
