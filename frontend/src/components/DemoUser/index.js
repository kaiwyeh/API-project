
import { useDispatch } from "react-redux";
import { thunkDemoUser } from "../../store/session";
import './DemoUser.css'

const DemoUser = () => {
 const dispatch = useDispatch()
 const onClick = async (event) => {
  await dispatch(thunkDemoUser())

 }


 return (
  <button className="DemoUserButton" onClick={onClick}>Demo User</button>
 )
}


export default DemoUser;
