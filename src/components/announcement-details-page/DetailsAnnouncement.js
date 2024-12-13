import React, { useState } from "react";
import "./styles.css";
import {
  Favorite,
  FavoriteBorderOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import ForRent from "./ForRent";
import ForSale from "./ForSale";
import PropTypes from 'prop-types';
import user from '../../images/profil-user.png'

const DetailsAnnouncement = ( {photo, profile, ownerType, ownerName, email, phoneNumber, transaction, title, location, propertyType, surface, price, nbRooms, furniture, description, latitude, longitude} ) => {
  let navigate = useNavigate();
  let userpk // recoit pk du user

  const handleProfileClick = () => {
    navigate("/profiledetails", {userpk});
  };

  DetailsAnnouncement.propTypes = {
    photo: PropTypes.object.isRequired,
    profile: PropTypes.object,
    ownerType: PropTypes.string.isRequired,
    ownerName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    transaction: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    propertyType: PropTypes.string.isRequired,
    surface: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    nbRooms: PropTypes.number.isRequired,
    furniture: PropTypes.bool.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }

  if(profile === undefined){
    profile = user
  }

  const [isFavorite, setFavorite] = useState(false); //si fait partie des favoris
  const handleFavorite = () => {
    setFavorite(!isFavorite);
    if (isFavorite) {
      // Ajouter aux favoris
    } else {
      // Retirer des favoris
    }
  };

  let forSale;
  if(transaction === 'Sale'){
    forSale=true;
  }else{
    forSale=false;
  }

  let furnished
  if(furniture === true){
    furnished='yes'
  }else{
    furnished='no'
  }

  return (
    <div className="conteinant center2">
      <div className="picture-owner">
        <img alt="" src={photo} className="photo" />
        <div className="owner">
          Announcement owner :
          <div className="contenant-owner">
            <div className="owner-head">
              <img alt="" src={profile} className="photo-profil" />
              <div className="owner-info">
                <div className="owner-type">{ownerType}</div>
                <div className="owner-name">{ownerName}</div>
              </div>
            </div>
            <div className="owner-contacts">
              <div>{email}</div>
              <div>{phoneNumber}</div>
            </div>
            <div className="center3">
              <button className="profile-button" onClick={handleProfileClick}>
                View profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="details">
        <button className="favorite" onClick={handleFavorite}>
          {isFavorite && (
            <Favorite style={{ color: "#C84008", fontSize: 40 }} />
          )}
          {!isFavorite && (
            <FavoriteBorderOutlined
              style={{ color: "#C84008", fontSize: 40 }}
            />
          )}
        </button>
        {forSale && <ForSale />}
        {!forSale && <ForRent />}
        <div className="titre">{title}</div>
        <div className="localisation">
          <LocationOnOutlined style={{ color: "#8191A0", fontSize: 22 }} />
          {location}
        </div>
        <div className="details-h">
          <span className="details-titre">Property type : </span>
          <span className="details-data">{propertyType}</span>
        </div>
        <div className="details-h">
          <span className="details-titre">Surface : </span>
          <span className="details-data">{surface} m²</span>
        </div>
        <div className="details-h">
          <span className="details-titre">Price : </span>
          <span className="details-data">{price} DZD</span>
        </div>
        <div className="details-h">
          <span className="details-titre">Number of rooms : </span>
          <span className="details-data">{nbRooms}</span>
        </div>
        <div className="details-h">
          <span className="details-titre">Furnished : </span>
          <span className="details-data">{furnished}</span>
        </div>
        <div className="details-h2">
          <span className="details-titre">Description :</span>
          <span className="details-desc">
            {description}
          </span>
        </div>
        <div className="details-h2">
          <span className="details-titre">Location :</span>
          <YMaps query={{ lang: 'en_US' }}>
            <div className="maps">
              <Map
                defaultState={{ center: [latitude, longitude], zoom: 15 }}
              >
                <Placemark geometry={[latitude, longitude]} />
              </Map>
            </div>
          </YMaps>
        </div>
      </div>
    </div>
  );
};

export default DetailsAnnouncement;
