import React, { useState } from "react";
import "./styles/Sign.css";
import Logo from "../images/LOGO.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(false);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError(false);
  };

  const [error, setError] = useState(false);

  const handleContinueButton = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      //echec de la connexion
      setError(true);
    } else {
      const user = {
        email: email,
        password: password
      };
      axios.post('http://localhost:8000/api/login/', {user} )
      .then((res)=>{
        console.log(res)
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
      <div className="welcome2">Welcome to Amlak <span aria-label="hi" role="img">👋</span></div>
        <div className="description2">Sign in to your account</div>
        {error && (
          <span className="erreur">
            Wrong e-mail or password, please try again!
          </span>
        )}
        <div className="form">
          E-mail
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
        <div className="form">
          Password
          <input
            type="password"
            className="forml_input"
            id="motdepasse"
            placeholder="Enter your password"
            value={password}
            required
            onChange={handlePasswordChange}
          />
          <div className="toright fitcontent">
            <a href="/forgetpassword" className="orange">
              Forgot your password?
            </a>
          </div>
        </div>
        <div className="form2">
          <button
            className="create-button center2"
            onClick={handleContinueButton}
          >
            Continue
          </button>
        </div>
        <span className="login">
          <span>Don&#39;t have an account?&thinsp;</span>
          <a href="/register" className="orange">
            {" "}
            Sign up
          </a>
        </span>
      </div>
    </div>
  );
};

export default SignInPage;
