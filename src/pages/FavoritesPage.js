import React from "react";
import NavRightFavs from "../components/my-profile-page/NavRightFavs";
import Profile from '../images/profile.png'
//import user from '../images/profil-user.png'
import '../components/my-profile-page/profile.css'

const FavoritesPage = () => {
  let nom = 'Amlak' //a remplir avec les données + condition photo
  let email = 'example@email.com'
  return (
    <>
      
      <div className="my-profile">
        <NavRightFavs/>
        <div className="infos-profil">
          <div className="banniere"></div>
          <div className="photo-infos">
            <img alt="" src={Profile} className="photo-profile"/>
            <div className="info">
              <div className="name">{nom}</div>
              <div className="email">{email}</div>
            </div>
          </div>
          <div className="titree">ALL YOUR FAVORITE PROPERTIES</div>
          
        </div>
      </div>

  </>
  );
};

export default FavoritesPage;
