import React from "react";
import "./styles/Sign.css";
import Logo from "../images/LOGO.png";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  let navigate = useNavigate();

  const handleLoginButton = () => {
    //Go to log in page
    navigate("/login");
  };

  const handleIndivButton = () => {
    //Go to sign up individual page
    navigate("/registerindiv");
  };

  const handleAgencyButton = () => {
    //Go to sign up agency page
    navigate("/registeragency");
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
      <div className="contenant2 center2">
        <div className="login">
          <button className="orange-button" onClick={handleIndivButton}>
            Sign up as an individual
          </button>
        </div>
        <div className="separation">
          <hr className="ligneH" width={"110"} />
          or
          <hr className="ligneH" width={"110"} />
        </div>
        <div className="login">
          <button className="orange-button" onClick={handleAgencyButton}>
            Sign up as an agency
          </button>
        </div>
        <div className="separation">
          <hr className="ligneH" width={"110"} />
          or
          <hr className="ligneH" width={"110"} />
        </div>
        <div className="login">
          <button className="login-large-button" onClick={handleLoginButton}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};
