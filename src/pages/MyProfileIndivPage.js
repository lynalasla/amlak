import React, { useState } from "react";
import NavRightProfile from "../components/my-profile-page/NavRightProfile";
//import Profile from '../images/profile.png'
import user from '../images/profil-user.png'
import '../components/my-profile-page/profile.css'
import NavbarFirst from "../navbar1/navbar1";
import axios from "axios";

const MyProfileIndivPage = () => {

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
  
  const [firstName, setFirstName] = useState(data['prenom']); //Set first name
  const [firstNameError, setFirstNameError] = useState(false);
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const validateFirstName = () => {
    if (firstName.trim() === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }
  };

  const [lastName, setLastName] = useState(data['nom']); //Set last name
  const [lastNameError, setLastNameError] = useState(false);
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const validateLastName = () => {
    if (lastName.trim() === "") {
      setLastNameError(true);
    } else {
      setLastNameError(false);
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
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhoneNumber();
    if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !phoneNumberError
    ) {
      let toSend = {
        nom: lastName,
        prenom: firstName,
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
              <div className="name">{firstName} {lastName}</div>
              <div className="email">{email}</div>
            </div>
          </div>
          <div className="formu">
            <div className="formu1">
              <div className="form-title">First name</div>
              <input
                type="text"
                className="formu_input"
                id="nom"
                placeholder="Enter your first name"
                value={firstName}
                required
                onChange={handleFirstNameChange}
                onBlur={validateFirstName}
                />
            </div>
            <div className="formu1">
              <div className="form-title">Last name</div>
              <input
                type="text"
                className="formu_input"
                id="prenom"
                placeholder="Enter your last name"
                value={lastName}
                required
                onChange={handleLastNameChange}
                onBlur={validateLastName}
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

export default MyProfileIndivPage;
