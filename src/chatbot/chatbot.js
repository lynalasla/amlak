import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './chatbot.css'
import logo from '../ressources/with_mob.png'; 


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    setMessages([...messages, { text: inputMessage, user: 'user' }]);
    // Logique de traitement du message (à remplacer par votre propre logique)

    setInputMessage('');
  };

  return (
 <div className="flex h-screen">
    
    <div className="w-1-4 bg-gradient-to-bfrom-CCC5B9to- flex flex-col items-center justify-center p-4">
        {/* Contenu de la sidebar (image du robot et message) */}
        <img 
            src={logo}
            alt="Robot"
           
          />
        <div className="p-4 text-center">
         
          <p className="text-black mb-1 font-semibold text-2xl">Need assistance?</p>
          <p className="text-orange-700 font-semibold text-2xl">Chat now!</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto ml-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.user === 'user' ? 'self-start  bg-orange-700 text-white text-right ' : ' self-end bg-gray-300 text-white  text-right '}`}
            >
                {/* Ajuste la largeur en fonction du contenu */}
                {message.text}

            </div>
          ))}
        </div>
        <div className="flex items-center p-4">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg focusoutline-none text-lg"
          />
          <button onClick={handleSendMessage} className="p-2 rounded-r-lg bg-transparent border-none">
            <FontAwesomeIcon icon={faPaperPlane} className="text-3xl text-orange-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
