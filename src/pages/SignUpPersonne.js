import React, { useState } from "react";
import "./styles/Sign.css";
import Logo from "../images/LOGO.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPersonnePage = () => {
  const [firstName, setFirstName] = useState("");
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

  const [lastName, setLastName] = useState("");
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

  const [email, setEmail] = useState("");
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

  const [phoneNumber, setPhoneNumber] = useState("");
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

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState(false);
  const validatePassword2 = () => {
    if (password2 !== password) {
      setPassword2Error(true);
      return;
    } else {
      setPassword2Error(false);
    }
  };
  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhoneNumber();
    validatePassword();
    validatePassword2();
    if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !phoneNumberError &&
      !passwordError &&
      !password2Error
    ) {
      //Create account
      let toSend = {
        email: email,
        password: password,
        is_company: false,
        iprofile:{ telnumber: phoneNumber,
        nom: lastName,
        prenom: firstName
      }
      }
      console.log(toSend)
      axios.post('http://localhost:8000/api/register/', toSend)
      .then((response) => {
        console.log(response);
        //Go to logged in landing page
        navigate("/");
      }).catch(err => console.error(err))
    }
  };

  const handleLoginButton = () => {
    //Go to log in page
    navigate("/login");
  };

  return (
    <div className="divprincipal center">
      <div className="center2">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="description">
        Create your own account et publish your real estate announcements for
        free.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="contenant center2">
        <div className="welcome">Welcome to Amlak <span aria-label="hi" role="img">👋</span></div>
          <div className="description2">Start by creating your account</div>
          <div className="form2">
            <div className="form">
              First name
              <input
                type="text"
                className="form_input"
                id="nom"
                placeholder="Enter your first name"
                value={firstName}
                required
                onChange={handleFirstNameChange}
                onBlur={validateFirstName}
              />
              {firstNameError && (
                <span className="error">First Name is required</span>
              )}
              {!firstNameError && (
                <span className="noterror">First Name is required</span>
              )}
            </div>
            <div className="form">
              Last name
              <input
                type="text"
                className="form_input"
                id="prenom"
                placeholder="Enter your last name"
                value={lastName}
                required
                onChange={handleLastNameChange}
                onBlur={validateLastName}
              />
              {lastNameError && (
                <span className="error">Last Name is required</span>
              )}
              {!lastNameError && (
                <span className="noterror">Last Name is required</span>
              )}
            </div>
          </div>
          <div className="form2">
            <div className="form">
              E-mail
              <input
                type="email"
                className="form_input"
                id="email"
                placeholder="Enter your e-mail"
                value={email}
                required
                onChange={handleEmailChange}
                onBlur={validateEmail}
              />
              {emailError && (
                <span className="error">E-mail is required correctly</span>
              )}
              {!emailError && (
                <span className="noterror">E-mail is required correctly</span>
              )}
            </div>
            <div className="form">
              Phone number
              <input
                type="tel"
                className="form_input"
                id="numTel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                pattern="[0-9]{4}[0-9]{2}[0-9]{2}[0-9]{2}"
                onChange={handlePhoneNumberChange}
                onBlur={validatePhoneNumber}
              />
              {phoneNumberError && (
                <span className="error">Phone number is not valid</span>
              )}
              {!phoneNumberError && (
                <span className="noterror">Phone number is not valid</span>
              )}
            </div>
          </div>
          <div className="form2">
            <div className="form">
              Password
              <input
                type="password"
                className="form_input"
                id="motdepasse"
                placeholder="Enter your password"
                value={password}
                required
                onChange={handlePasswordChange}
                onBlur={validatePassword}
              />
              {passwordError && (
                <span className="error">
                  Password is required with at least 8 characters
                </span>
              )}
              {!passwordError && (
                <span className="noterror">
                  Password is required with at least 8 characters
                </span>
              )}
            </div>
            <div className="form">
              Re-enter password
              <input
                type="password"
                className="form_input"
                id="motdepasse2"
                placeholder="Re-enter your password"
                value={password2}
                required
                onChange={handlePassword2Change}
                onBlur={validatePassword2}
              />
              {password2Error && (
                <span className="error">Passwords do not match</span>
              )}
              {!password2Error && (
                <span className="noterror">Passwords do not match</span>
              )}
            </div>
          </div>
          <div className="form2">
            <input
              type="submit"
              className="create-button center2"
              value={"Create account"}
            />
          </div>
          <div className="separation">
            <hr className="ligneH" width={"80"} />
            or
            <hr className="ligneH" width={"80"} />
          </div>
          <div className="login">
            <button className="login-button" onClick={handleLoginButton}>
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPersonnePage;
