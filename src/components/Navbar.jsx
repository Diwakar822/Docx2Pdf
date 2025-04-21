import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Links } from 'react-router-dom';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
             <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold"><a href="/">JD DOCX2PDF</a></h1>
        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="md:flex space-y-2 md:space-y-0 md:space-x-6">
            <li><button className="hover:underline"><a href="/Login">Login</a></button></li>
            <li><button className="hover:underline"><a href="/Logout">Logout</a></button></li>
           
            
          </ul>
        </div>
      </div>
    </nav>
        </div>
    );
};

export default Navbar;