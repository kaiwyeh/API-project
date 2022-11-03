import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function DemoUser() {
 const dispatch = useDispatch();
 const handleSubmit = (e) => {
  e.preventDefault();

  return dispatch(
   sessionActions.login(
    {
     credential: 'demo@appacademy.io',
     password: 'password'
    })
  );
 };

 return (
  <button className='one-button' onClick={handleSubmit}>Demo Login</button>
 )
}
export default DemoUser;
