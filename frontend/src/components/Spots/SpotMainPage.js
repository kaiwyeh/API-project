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
 const allSpots = useSelector(state => state.spots)  //spot?

 useEffect(() => {
  dispatch(spotsActions.getAllTheSpots())
 }, [dispatch])

 if (!allSpots.spots) {
  return (
   <div>Loading</div>
  )
 } else {
  return (
   <div>
    <div>
     {Object.values(allSpots.spots).map(({ id, ownerId, address, city, state, country, description, lat, lng, name, price, avgRating, previewImage }) => {
      const spot = { id, ownerId, address, city, state, country, description, lat, lng, name, price, avgRating, previewImage }
      return (
       <div key={id}>
        
       </div>
      )
     })}
    </div>
   </div>
  )
 }
}













export default SpotMainPage
