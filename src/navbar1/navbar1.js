import React from 'react';
import logo from '../ressources/amlak.png'; 

//import profileImage from './profile.jpg'; 

const NavbarFirst = () => {
  return (
    <nav className="bgFAF9F9 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-13 mr-2"
          />
        </div>

       

     
        <div className="flex space-x-20">
          <p className="text-black">Home</p>
          <p className="text-black">Service</p>
          <p className="text-black">Ads</p>
          <p className="text-black">About Us</p>
        </div>

        {/* Photo de profil ronde 
        <div>
          <img
            src={profileImage}
            alt="Profile"
            className="h-10 w-10 rounded-full border border-white"
          />
        </div>*/}
      </div>
    </nav>
  );
};

export default NavbarFirst;
