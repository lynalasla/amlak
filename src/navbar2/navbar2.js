import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import logo from '../ressources/amlak.png'; 
import user from '../images/profil-user.png';
import { useNavigate } from "react-router-dom";

const SecondNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  let navigate = useNavigate();

  const handleSearch = () => {
    // Mettez ici la logique de recherche, par exemple, redirigez vers une nouvelle page avec la requête de recherche.
    console.log('Search query:', searchQuery);
    navigate("/search");
  };

  return (
    <div className="bgFAF9F9 p-4 shadow-md flex items-center justify-between">
      
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-13 mr-2"
        />
      </div>

      {/* Champ de recherche  */}
      <div className="flex items-center relative">
        <input
          type="text"
          placeholder="   Search for announcements"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-72 h-8 px-3 mr-2 border rounded-full focusoutline-none bg-gray-100"
        />
        <FaSearch
          className="absolute right-6 top-2 cursor-pointer text-orange-700"
          onClick={handleSearch}
        />
      </div>

      {/* Bouton "Post" et photo de l'utilisateur à droite */}
      <div className="flex items-center">
        <button className="cursor-pointer text-white mr-10 flex items-center bg-orange-700 px-4 py-2 rounded-md border-none">
          Post new announcement
        </button>
        <div className="flex items-center">
          <img
            src={user}
            alt="User"
            className="h-10 w-10 rounded-full border"
          />
        </div>
      </div>
    </div>
  );
};

export default SecondNavbar;
