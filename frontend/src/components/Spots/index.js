import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getSpotsThunk, deleteSpotThunk } from "../../store/spots"
import './spots.css';

function GetAllSpots() {
 const dispatch = useDispatch();
 useEffect(() => { dispatch(getSpotsThunk()) }, [dispatch]);
 const history = useHistory()
 const sessionUser = useSelector(state => state.session.user);
 const spots = useSelector((state) => {
  if (state.spots.allSpots) return Object.values(state.spots.allSpots)
 })

 const deleteHandler = async (id) => {
  await dispatch(deleteSpotThunk(id))
  history.push("/");
 }

 return (
  <div>
   <div className="spot-preview">
    {spots?.map((spot) => {
     return (
      <NavLink key={spot.id} to={`/spots/${spot.id}`}>
       <img src={spot.previewImage}
        alt='spot-airbnb'
        className="spot-image-preview"
       />
       <div className="location-edit">
        <div className="spot-description">{`${spot.city}, ${spot.state}`}</div>
        {sessionUser?.id === spot?.ownerId && (
         <div>
          <NavLink to={`/spots/${spot?.id}/edit`}>
           <button className="one-button">Edit</button>
          </NavLink>
          <button className="one-button" onClick={() => deleteHandler(spot.id)}>Delete</button>
         </div>
        )}
       </div>

       <div className="spot-price">{`$${spot.price} night`}</div>
      </NavLink>
     )
    })
    }
   </div>
  </div>
 )
}

export default GetAllSpots;
