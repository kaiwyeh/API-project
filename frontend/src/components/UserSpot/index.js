import React, { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUserSpotsThunk, deleteSpotThunk } from "../../store/spots"
import './userSpot.css';

function GetUserSpots() {
 const dispatch = useDispatch();
 const history = useHistory()
 useEffect(() => { dispatch(getUserSpotsThunk()) }, [dispatch]);

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
    {spots.length < 1 ? <div>You don't have any spot.</div> : ''}
    {spots?.map((spot) => {
     return (
      <NavLink key={spot.id} to={`/spots/${spot.id}`}>
       <img src={spot.previewImage}
        alt='spot-airbnb'
        className="spot-image-preview"
       />
       <div className="spot-description">{`${spot.city}, ${spot.state}`}</div>
       <div className="spot-price">{`$${spot.price} night`}</div>
       <div>
        <NavLink to={`/spots/${spot?.id}/edit`}>
         <button className="one-button">Edit</button>
        </NavLink>
        <button className="one-button" onClick={() => deleteHandler(spot.id)}>Delete</button>
       </div>
      </NavLink>
     )
    })
    }
   </div>
  </div>
 )
}

export default GetUserSpots;
