import React, { useState } from "react";
import "./styles/Sign.css";
import Logo from "../images/LOGO.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
  let navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(false);
  };

  const handleResetButton = (event) => {
    event.preventDefault();
    if (password.length < 8) {
      setError(true);
    } else {
      //Update password
      axios.post('http://localhost:8000/api/change-password/', password)
      .then((response) => {
        console.log(response);
        //Go to logged in landing page
        navigate("/");
      }).catch(err => console.error(err))
    }
  };

  return (
    <div className="divprincipal center">
      <div className="center2">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="contenant2 center2">
        <div className="description3">Reset your password</div>
        {error && (
          <span className="erreur">
            Password should have at least 8 characters!
          </span>
        )}
        <div className="form">
          Create a new password for your account.
          <input
            type="password"
            className="forml_input"
            id="motdepasse"
            placeholder="Enter your new password"
            value={password}
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div className="form2">
          <button className="create-button center2" onClick={handleResetButton}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
