import React from "react";
import "./styles/Sign.css";
import Logo from "../images/LOGO.png";

const CheckMailPage = () => {
  return (
    <div className="divprincipal center">
      <div className="center2">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div className="contenant2 center2">
        <div className="description3">Check your mail</div>
        <div className="formm">
          An e-mail has been sent to reset your password!
        </div>
      </div>
    </div>
  );
};

export default CheckMailPage;
