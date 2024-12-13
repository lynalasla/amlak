import React from "react";
import NavRightPosts from "../components/my-profile-page/NavRightPosts";
import Profile from '../images/profile.png'
//import user from '../images/profil-user.png'
import '../components/my-profile-page/profile.css'
import NavbarFirst from "../navbar1/navbar1";

const MyAnnouncementsPage = () => {
  let nom = 'Amlak' //a remplir avec les données
  let email = 'example@email.com'
  return (
    <>
      <NavbarFirst />
      <div className="my-profile">
        <NavRightPosts/>
        <div className="infos-profil">
          <div className="banniere"></div>
          <div className="photo-infos">
            <img alt="" src={Profile} className="photo-profile"/>
            <div className="info">
              <div className="name">{nom}</div>
              <div className="email">{email}</div>
            </div>
          </div>
          <div className="titree">ALL PROPERTIES YOU PUBLISHED</div>
          
        </div>
      </div>
  </>
  );
};

export default MyAnnouncementsPage;
