import React, { useState, useEffect }  from 'react';
import { FaBars, FaTimes, FaSearch  } from 'react-icons/fa';
import Navbar from '../navbar1/navbar1'
import './recherche.css' ;

const Recherche = () => {
  useEffect(() => {
    console.log('Recherche component rendered');
  }, []);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setShowResults(!showResults);
  };
 // Ajout des états pour les options de real estate category
 const [selectedCategory, setSelectedCategory] = useState(null);


 // Ajout des états pour les filtres Price, Location, Surface, Number of rooms
 const [minPrice, setMinPrice] = useState('');
 const [maxPrice, setMaxPrice] = useState('');
 const [wilaya, setWilaya] = useState('');
 const [surface, setSurface] = useState('');
 const [numberOfRooms, setNumberOfRooms] = useState('');
  return (
    
<div className="min-h-screen flex flex-col">
       <div className="flex-grow relative">
      <Navbar />
      {/* Icône de la barre latérale */}
     
      <div className={`flex items-center ml-16 mt-10 ${showSidebar ? 'ml-80' : ''}`}>
  <div
    className={`cursor-pointer text-orange-700 ${showSidebar ? 'hidden' : 'block'}`}
    onClick={toggleSidebar}
  >
    <FaBars size={24} />
  </div>
  <p className="font-mono font-bold xltext-2xl text-black ml-4">
    Explore real estate listings that interest you 100% for free
  </p>
</div>

            <div className={`flex mt-10 ml-16 ${showSidebar ? 'ml-80' : ''}`}>
                <input
            type="text"
            placeholder="    What do you wish to search for ?"
            className="w-64 h-12 border border-gray-300 rounded-l-md focusoutline-none"
                />
          <button className=" h-12 text-white  mr-2 rounded-r-md bg-orange-700 w-24 flex items-center"> <FaSearch size={17}/> <span className="ml-2">Search</span></button>
            </div>
       


          
            {showResults && (
             <div className="absolute mt-10 ml-80">
             <p className="font-mono font-bold xltext-2xl text-orange-700">Results of filtering</p>
             </div>
                   )}
        
     
        {/* Sidebar */}
      {showSidebar && (
        <div className="absolute left-0 top-20  w-64  bg-white	border-r border-gray-300 p-4 z-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold font-mono text-xl text-orange-700">All filters</h2>
            {/* Icône de fermeture de la barre latérale */}
            <div className="p-2 cursor-pointer text-orange-700" onClick={toggleSidebar}>
              <FaTimes size={24} />
            </div>
          </div>
          {/* Contenu de la barre latérale */}


               {/* Options de real estate category */}
               <div className="mb-4">
  <p className="font-semibold mb-2">Real estate category</p>
  <div className="flex flex-col">
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={selectedCategory === 'Apartment'}
        onChange={() => setSelectedCategory('Apartment')}
        className="appearance-none w-4 h-4 border border-gray-300 rounded-md checkedbg-orange-700 checkedborder-orange-700 checkedborder-2 checkedtext-white"
      />
      <p
        className={`cursor-pointer ml-2 ${selectedCategory === 'Apartment' ? 'text-orange-700' : ''}`}
        onClick={() => setSelectedCategory('Apartment')}
      >
        Apartment
      </p>
    </div>
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={selectedCategory === 'House/Villa'}
        onChange={() => setSelectedCategory('House/Villa')}
        className="appearance-none w-4 h-4 border border-gray-300 rounded-md checkedbg-orange-700 checkedborder-orange-700 checkedborder-2 checkedtext-white"
      />
      <p
        className={`cursor-pointer ml-2 ${selectedCategory === 'House/Villa' ? 'text-orange-700' : ''}`}
        onClick={() => setSelectedCategory('House/Villa')}
      >
        House/Villa
      </p>
    </div>
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={selectedCategory === 'Studio'}
        onChange={() => setSelectedCategory('Studio')}
        className="appearance-none w-4 h-4 border border-gray-300 rounded-md checkedbg-orange-700 checkedborder-orange-700 checkedborder-2 checkedtext-white"
      />
      <p
        className={`cursor-pointer ml-2 ${selectedCategory === 'Studio' ? 'text-orange-700' : ''}`}
        onClick={() => setSelectedCategory('Studio')}
      
      >
        Studio
      </p>
    </div>
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={selectedCategory === 'Office'}
        onChange={() => setSelectedCategory('Office')}
        className="appearance-none w-4 h-4 border border-gray-300 rounded-md checkedbg-orange-700 checkedborder-orange-700 checkedborder-2 checkedtext-white "
      />
      <p
        className={`cursor-pointer ml-2 ${selectedCategory === 'Office' ? 'text-orange-700' : ''}`}
        onClick={() => setSelectedCategory('Office')}
      >
        Office
      </p>
    </div>
    <div className="flex items-center mb-2">
      <input
        type="checkbox"
        checked={selectedCategory === 'Building plot'}
        onChange={() => setSelectedCategory('Building plot')}
        className="appearance-none w-4 h-4 border border-gray-300 rounded-md checkedbg-orange-700 checkedborder-orange-700 checkedborder-2 checkedtext-white "
      />
      <p
        className={`cursor-pointer ml-2 ${selectedCategory === 'Building plot' ? 'text-orange-700' : ''}`}
        onClick={() => setSelectedCategory('Building plot')}
      >
        Building plot
      </p>
    </div>
  </div>
</div>

          {/* Filtres Price, Location, Surface, Number of rooms */}
          <div>
            {/* Price */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Price</p>
              <div className="flex">
                <input
                  type="text"
                  placeholder="  MIN (DZD)"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full h-10 border-none rounded-l-md focusoutline-none"
                />
                <input
                  type="text"
                  placeholder="  MAX (DZD)"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full h-10 border-none rounded-r-md focusoutline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Location</p>
              <input
                type="text"
                placeholder="  Wilaya"
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                className="w-full h-10 border-none rounded-md focusoutline-none"
              />
            </div>

            {/* Surface */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Surface</p>
              <input
                type="text"
                placeholder="  Surface (m²)"
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                className="w-full h-10 border-none rounded-md focusoutline-none"
              />
            </div>

            {/* Nombre de pièces */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Number of rooms</p>
              <input
                type="text"
                placeholder="  Ex: 3 rooms"
                value={numberOfRooms}
                onChange={(e) => setNumberOfRooms(e.target.value)}
                className="w-full h-10 border-none rounded-md focusoutline-none"
              />
            </div>
          </div>
        </div>
      )}

      </div>
    {/* Placeholder pour maintenir l'espace du footer */}
<div className="flex-grow" />

{/* Footer */}
    </div>
  );
};


export default Recherche;
