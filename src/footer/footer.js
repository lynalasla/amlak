
import React from 'react';
import logo from '../ressources/amlak.png'; 

import { FaHome, FaAd, FaHandsHelping, FaMapMarkedAlt, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bgCCC5B9 p-1 bottom-0 w-full">
      <div className="flex items-center justify-between mb-8">
        <p className="text-lg">Do you have questions ?</p>
        <button className="bgC84008 text-white px-4 py-2 rounded-md border-none h-8">Contact us</button>
      </div>

      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-13 mr-4"
        />
        <div className="flex-1 flex justify-center">
          {/* Layouts */}
          <div className="text-center">
            <h2 className="text-xl mb-4">Layouts</h2>
            <ul>
              <li className="flex items-center"><FaHome className="mr-2" />Home</li>
              <li className="flex items-center"><FaAd className="mr-2" />Ads</li>
              <li className="flex items-center"><FaHandsHelping className="mr-2" />Service</li>
              <li className="flex items-center"><FaMapMarkedAlt className="mr-2" />Maps</li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl mb-4">Social Media</h2>
          <ul>
            <li className="flex items-center"><FaInstagram className="mr-2" />Instagram</li>
            <li className="flex items-center"><FaFacebook className="mr-2" />Facebook</li>
            <li className="flex items-center"><FaEnvelope className="mr-2" />Email</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
