import Home from './components/HomePage/Home-Js-Files/Home';
import React from 'react';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Details from './components/HomePage/Home-Js-Files/DetailsFillingPage/Details';
import PreviewPage from './components/HomePage/Home-Js-Files/DetailsFillingPage/Preview';
import MyResume from './components/MyResumes/MyResumes';

import AboutUs from './components/AboutUs';
function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/about' element={<AboutUs />} />
          <Route path='/' element={<Home />} />
          <Route path='/preview' element={<PreviewPage/>} />
          <Route path='/details' element={<Details />} />
          <Route path='/myresumes' element={<MyResume/>} />
        
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;
