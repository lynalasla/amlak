import React, { useState } from "react";
import NavRightProfile from "../components/my-profile-page/NavRightProfile";
//import Profile from '../images/profile.png'
import user from '../images/profil-user.png'
import '../components/my-profile-page/profile.css'
import NavbarFirst from "../navbar1/navbar1";
import axios from "axios";

const MyProfileAgencyPage = () => {
  
  const [data, setData] = useState([])
  axios.get("http://localhost:8000/api/myprofile/profile/") 
  .then((response) => 
  {
    setData(response.data)
  }).catch(err => console.error(err))

  let profile = user
  if(data['image'] !== null){
    profile = data['image']
  }

  const [agencyName, setAgencyName] = useState(data['nom']); //Set agency name + si y a pas de photo
  const [agencyNameError, setAgencyNameError] = useState(false);
  const handleAgencyNameChange = (event) => {
    setAgencyName(event.target.value);
  };
  const validateAgencyName = () => {
    if (agencyName.trim() === "") {
      setAgencyNameError(true);
    } else {
      setAgencyNameError(false);
    }
  };

  const [location, setLocation] = useState(data['location']); //Set location
  const [locationError, setLocationError] = useState(false);
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const validateLocation = () => {
    if (location.trim() === "") {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
  };

  const [email, setEmail] = useState(data['email']);
  const [emailError, setEmailError] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const validateEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const [phoneNumber, setPhoneNumber] = useState(data['telnumber']);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const validatePhoneNumber = () => {
    const regex = /^\d{4}\d{2}\d{2}\d{2}$/;
    if (phoneNumber !== "" && !regex.test(phoneNumber)) {
      setPhoneNumberError(true);
    } else {
      setPhoneNumberError(false);
    }
  };

  const handleSaveClick = (event) => {
    event.preventDefault();
    validateAgencyName();
    validateLocation();
    validateEmail();
    validatePhoneNumber();
    if (
      !agencyNameError &&
      !locationError &&
      !emailError &&
      !phoneNumberError
    ) {
      let toSend = {
        nom: agencyName,
        location: location,
        email: email,
        telnumber: phoneNumber
      }
      //Save changes
      axios.post('http://localhost:8000/api/myprofile/profile/update/', toSend)
      .then((response) => {
        console.log(response);
      }).catch(err => console.error(err))
    }
  };

  return (
    <>
      <NavbarFirst />
      <div className="my-profile">
        <NavRightProfile/>
        <div className="infos-profil">
          <div className="banniere"></div>
          <div className="photo-infos">
            <img alt="" src={profile} className="photo-profile"/>
            <div className="info">
              <div className="name">{agencyName}</div>
              <div className="email">{email}</div>
            </div>
          </div>
          <div className="formu">
            <div className="formu1">
              <div className="form-title">Agency name</div>
              <input
                type="text"
                className="formu_input"
                id="nom"
                placeholder="Enter your agency name"
                value={agencyName}
                required
                onChange={handleAgencyNameChange}
                onBlur={validateAgencyName}
                />
            </div>
            <div className="formu1">
              <div className="form-title">Location</div>
              <input
                type="text"
                className="formu_input"
                id="lieu"
                placeholder="Enter your location"
                value={location}
                required
                onChange={handleLocationChange}
                onBlur={validateLocation}
                />
            </div>
            <div className="formu1">
              <div className="form-title">Email</div>
              <input
                type="email"
                className="formu_input"
                id="mail"
                placeholder="Enter your e-mail"
                value={email}
                required
                onChange={handleEmailChange}
                onBlur={validateEmail}
                />
            </div>
            <div className="formu1">
              <div className="form-title">Phone number</div>
              <input
                type="tel"
                className="formu_input"
                id="numTel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                pattern="[0-9]{4}[0-9]{2}[0-9]{2}[0-9]{2}"
                onChange={handlePhoneNumberChange}
                onBlur={validatePhoneNumber}
                />
            </div>
          </div>
          <div className="button-div">
            <button className="save-button" onClick={handleSaveClick}>Save</button>
          </div>
        </div>
      </div>
  </>
  );
};

export default MyProfileAgencyPage;
