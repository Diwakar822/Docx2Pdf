import React from 'react';

const Footer = () => {
    return (
        <div>
             <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">JD DOCX2PDF</h3>
          <p>Convert your documents effortlessly.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/" className="hover:underline">How to Use</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <p>lokeshofficial40.com</p>
          <p>+91 9025713136</p>
        </div>
      </div>
      <div className="text-center mt-8 pt-4 border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} JD DOCX2PDF. All rights reserved.</p>
       
      </div>
    </footer>
        </div>
    );
};

export default Footer;