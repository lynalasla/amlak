import React, { useState} from "react";
import { Menu } from "@mui/icons-material";
import './profile.css'

const NavRightPosts = () => {
  const [isVisible, setVisible] = useState(true);
  const handleVisible = () => {
    setVisible(!isVisible);
  };

  let elementsReduits = <div className="menu-reduit">
    <Menu fontSize="large" className="menu" onClick={handleVisible}/>
  </div>

  let profile = 'profileindiv' //condition si agence ou indiv

  let elements = <div>
                    <Menu fontSize="large" className="menu" onClick={handleVisible}/>
                    <a href={profile} className="menu-items">
                      My profile
                    </a>
                    <a href="/favorites" className="menu-items"> 
                      Favorite announcements
                    </a>
                    <a href="/myannouncements" className="menu-items chosen-item">
                    <div className="rec-orange" /> 
                      My announcements
                    </a>
                  </div>
  return (
  <>
    {isVisible && elements}
    {!isVisible && elementsReduits}
  </>
  );
};

export default NavRightPosts;
