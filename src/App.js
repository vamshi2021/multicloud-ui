import { React, Suspense } from 'react';
import './App.css';
import LandingPage from './stores/pages/PageLanding';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MobilePage from './stores/pages/MobilepageList';
import WatchPage from './stores/pages/WatchpageList';
import Furniturepage from './stores/pages/Furniturepage'; 
import Acpage from './stores/pages/Acpage';
import MobileSingle from './stores/singles/MobileSingle';
import AcSingle from './stores/singles/AcSingle';
import FurnitureSingle from './stores/singles/FurnitureSingle';
import WatchSingle from './stores/singles/WatchSingle';
import UserCart from './stores/UserCart';

function App() {
    return (
        <Router>
        <div>
          <hr/>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} /> 
              <Route path="/Mobiles" element={<MobilePage />} />
              <Route path="/Furniture" element={<Furniturepage />} />
              <Route path="/Watch" element={<WatchPage />} />
              <Route path="/Ac" element={<Acpage/>} />
                <Route path='/Mobile/:id' element = {<MobileSingle />} />
                <Route path='/Furniture/:id' element = {<FurnitureSingle />} />
                <Route path='/Watch/:id' element = {<WatchSingle />} />
                <Route path='/Ac/:id' element = {<AcSingle />} />
              <Route path='/cart' element = {<UserCart />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    );
}

export default App;
