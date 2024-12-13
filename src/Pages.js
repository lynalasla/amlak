import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import LandingPage from "./pages/LandingPage";
import {SignUpPage} from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import MyProfileIndivPage from "./pages/MyProfileIndivPage";
import MyProfileAgencyPage from "./pages/MyProfileAgencyPage";
import AnnouncementDetailsPage from "./pages/AnnouncementDetailsPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignUpAgencePage from "./pages/SignUpAgence";
import SignUpPersonnePage from "./pages/SignUpPersonne";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import CheckMailPage from "./pages/CheckMailPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from './pages/FavoritesPage';
import MyAnnouncementsPage from './pages/MyAnnouncementsPage';
import Recherche from "./recherche/recherche";
import Chatbot from "./chatbot/chatbot";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";

const Pages = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignInPage />}></Route>
          <Route path="/register" element={<SignUpPage />}></Route>
          <Route path="/registerindiv" element={<SignUpPersonnePage />}></Route>
          <Route path="/registeragency" element={<SignUpAgencePage />}></Route>
          <Route path="/profiledetails" element={<ProfilePage />} />
          <Route
            path="/profileindiv"
            element={
              localStorage.getItem("userId") !== "null" ? (
                <MyProfileIndivPage />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/profileagence"
            element={
              localStorage.getItem("userId") !== "null" ? (
                <MyProfileAgencyPage />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/resetpassword" element={<ResetPasswordPage />} />
          <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
          <Route path="/checkmail" element={<CheckMailPage />}></Route>
          <Route path="/details" element={<AnnouncementDetailsPage />} />
          <Route path="/myannouncements" element={<MyAnnouncementsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<Recherche />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/contact' component={Contact} />
        </Routes>
      </Router>
    </>
  );
};

export default Pages;
