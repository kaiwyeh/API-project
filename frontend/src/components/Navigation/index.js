
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import SignUpModal from "../SignUpFormPage/SignUpModal";
import { useState } from "react";
import logo from '../../images/airbb.png'



function Navigation({ isLoaded }) {
 const sessionUser = useSelector((state) => state.session.user);
 const [startMenu, setStartMenu] = useState(false);

 const [signUp, setSignUp] = useState(false)
 const [logIn, setLogIn] = useState(false)




 let sessionLinks = <ProfileButton signUp={signUp} setSignUp={setSignUp} logIn={logIn} setLogIn={setLogIn} showStartMenu={setStartMenu} user={sessionUser} />

 return (
  <div className="navbar_container">
   <div className="navbar">
    <div className="airbnbhome_div">
     <NavLink className="airbnbhome" exact to="/">
      <img
       style={{ width: "40px", height: "40px", objectFit: "contain" }}
       src={logo}
       alt="Home"
      ></img>
      <div className="airbnbhome_text">&nbsp;TravelBnB</div>
     </NavLink>
    </div>
    {isLoaded && sessionLinks}
    <SignUpModal menu={startMenu} showMenu={setStartMenu} signUp={signUp} setSignUp={setSignUp} />
    <LoginFormModal showMenu={setStartMenu} logIn={logIn} setLogIn={setLogIn} />
   </div>
  </div>
 );
}

export default Navigation;
