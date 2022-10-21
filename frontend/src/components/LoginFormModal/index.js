import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginFormModal.css'


function LoginForm({ hideModal }) {
 const dispatch = useDispatch();
 const [credential, setCredential] = useState("");
 const [password, setPassword] = useState("");
 const [errors, setErrors] = useState([]);



 const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors([]);
  const validData = await dispatch(sessionActions.login({ credential, password })).catch(
   async (res) => {
    const data = await res.json();
    if (data && data.errors) setErrors(data.errors);
   }
  );
  if (validData) hideModal();
 };


//Changed
 return (
  <div className="logindiv">
   <div className="login_header">

    <div className="login_text"></div>
   </div>
   <form className="loginform" onSubmit={handleSubmit}>
    <h2>Welcome to Travelbnb!</h2>
    <div className="loginerror">
     {errors.map((error, idx) => (
      <div className="loginerror_text" key={idx}>
       {error}
      </div>
     ))}
    </div>
    <div>
     <input
      className="loginemail"
      placeholder="Email or Username"
      type="text"
      value={credential}
      onChange={(e) => setCredential(e.target.value)}
     />
    </div>
    <div>
     <input
      className="loginpass"
      placeholder="Password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
     />
    </div>

    <button className="loginbutton" type="submit">
     Log In
    </button>
   </form>
  </div>
 );
}

export default LoginForm;



















// import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';

// function LoginFormModal() {
//  const [showModal, setShowModal] = useState(false);

//  return (
//   <>
//    <button onClick={() => setShowModal(true)}>Log In</button>
//    {showModal && (
//     <Modal onClose={() => setShowModal(false)}>
//      <LoginForm />
//     </Modal>
//    )}
//   </>
//  );
// }

// export default LoginFormModal;
