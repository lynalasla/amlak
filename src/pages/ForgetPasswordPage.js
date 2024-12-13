import React, { useState } from "react";
import "./styles/Sign.css";
import Logo from "../images/LOGO.png";
import { useNavigate } from "react-router-dom";

const ForgetPasswordPage = () => {
  let navigate = useNavigate();

  const handleSendButton = () => {
    if (email.trim() === "") {
      //e-mail non existant dans la base
      setError(true);
    } else {
      //Send reset password e-mail

      //Go to check mail page
      navigate("/checkmail");
    }
  };

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(false);
  };

  return (
    <div className="divprincipal center">
      <div className="center2">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="contenant2 center2">
        <div className="description3">Reset your password</div>
        {error && (
          <span className="erreur">Wrong e-mail, please try again!</span>
        )}
        <div className="form">
          Enter your e-mail address below, and we will send you a link to reset
          your password.
          <input
            type="email"
            className="forml_input"
            id="email"
            placeholder="Enter your e-mail"
            value={email}
            required
            onChange={handleEmailChange}
          />
        </div>
        <div className="form2">
          <button className="create-button center2" onClick={handleSendButton}>
            Send e-mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
