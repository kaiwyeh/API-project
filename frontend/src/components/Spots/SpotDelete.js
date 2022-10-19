import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteSpotById } from '../../store/spots';


import './SpotDelete.css'


const SpotDelete = ({ spot }) => {
 const dispatch = useDispatch();
 const history = useHistory();
 const onClick = async (event) => {
  event.preventDefault()
  await dispatch(deleteSpotById(Number(spot.id)))
  history.push('/')
 }




 return (
  <button className='deletespotbutton' onClick={onClick}>Delete Spot</button>
 )
}

export default SpotDelete;
