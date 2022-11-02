
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSpots } from '../../store/spots';


import './SpotsDeletePage.css'


const SpotsDeletePage = ({ spot }) => {

 const dispatch = useDispatch();
 const history = useHistory();

 const onClick = async (event) => {
  event.preventDefault()
  await dispatch(deleteSpots(Number(spot.id)))
  history.push('/')
 }




 return (
  <button className='deletespotbutton' onClick={onClick}>Delete Spot</button>
 )
}

export default SpotsDeletePage;
