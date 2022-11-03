import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import logo from './favicon.png'
import DemoUser from './demoUser';
import './Navigation.css';

function Navigation({ isLoaded }) {
 const sessionUser = useSelector(state => state.session.user);

 let sessionLinks;
 if (sessionUser) {
  sessionLinks = (
   <ProfileButton user={sessionUser} />
  );
 } else {
  sessionLinks = (
   <>
    <DemoUser />
    <LoginFormModal />
    <SignupFormModal />
   </>
  );
 }

 return (
  <div className='nav'>
   <div>
    <NavLink exact to="/">
     <img id='logo' src={logo} alt='airbnb-logo' />
    </NavLink>
   </div>
   <div className='right-nav'>
    <NavLink id='host' to="/BecomeAHost">
     Become a Host
    </NavLink>
    <div className='nav-buttons'>
     {isLoaded && sessionLinks}
    </div>
   </div>
  </div>
 );
}

export default Navigation;
