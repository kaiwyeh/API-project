import React, { useState, useEffect } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './SpotMainPage.css';
import * as reviewActions from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import { createASpot } from '../../store/spots';


const SpotMainPage = () => {
 const dispatch = useDispatch()
 const allSpot = useSelector(state => state.spot)
 const spots = Object.values(allSpot)

 useEffect(() => {
  dispatch(spotsActions.getAllTheSpots())
 }, [dispatch])

 const date = new Date();
 const nextDate = new Date();

 nextDate.setDate(date.getDate() + 5);

 const options = {
  month: "short",
  day: "numeric"
 }

 //changed
 return (
  <div className="spothome_container">
   <div className="spotcard">
    {spots.map((spot) => (
     <div key={spot.id}>
      <div className="spot_image_container">
       <NavLink to={`/spots/${spot.id}`}>
        <img
         className="spot_image"
         src={spot?.previewImage}
         alt="House test"
        ></img>
       </NavLink>
      </div>
      <div className="spot_detail_container">
       <div className="city_state_container">
        {`${spot.city}, ${spot.state}`}
       </div>
       <div className="spot_star_container">
        <i className="fa-solid fa-star"></i>
        &nbsp;{`${spot?.avgRating}`}
       </div>
      </div>
      <div className='bookingdate'>{`${date.toLocaleDateString(undefined, options)} - ${nextDate.toLocaleDateString(undefined, options)}`}</div>

      <div className="spot_price_container">
       <span
        className='spot_price_span'

       >{`$${spot.price}`}</span>
       &nbsp;night
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}













    export default SpotMainPage
