import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
 const dispatch = useDispatch();
 const [credential, setCredential] = useState("");
 const [password, setPassword] = useState("");
 const [message, setMessage] = useState([]);

 const handleSubmit = (e) => {
  e.preventDefault();
  setMessage([]);
  return dispatch(sessionActions.login({ credential, password })).catch(
   async (res) => {
    const data = await res.json();
    if (data && data.message) setMessage(data.message);
   })


 }

 return (
  <form className="form" onSubmit={handleSubmit}>
   {message.length > 1 ? <ul><li>{message}</li></ul> : ''}
   <label className="form-each">
    Email
    <input
     type="text"
     value={credential}
     onChange={(e) => setCredential(e.target.value)}
     required
    />
   </label>
   <label className="form-each">
    Password
    <input
     type="password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
     required
    />
   </label>
   <button className="one-button" type="submit">Log In</button>
  </form>
 );
}

export default LoginForm;
