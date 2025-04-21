import React from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import FileUpload from './components/FileUpload';
import HowToUse from './pages/HowToUse';
import Testimonials from './components/Testimonials';
import Footer from './components/components/Footer';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Logout from './pages/Logout';

const App = () => {
  return (
    <div>
   <BrowserRouter>
   <Navbar />
   <Routes>
   <Route path="/" element={<FileUpload />} />
   <Route path="/how-to-use" element={<HowToUse />} />
   <Route path="/login" element={<LoginPage/>}/>
     <Route path='/logout' element={<Logout/>}/>
   </Routes>
   <Testimonials />
   <Footer />
   </BrowserRouter>
  </div>
  );
};

export default App;