import React, { useState, useEffect } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import './dataPerSpot.css';

function dataPerSpot({ spot }) {
 const dispatch = useDispatch()
 const history = useHistory()
}

const handleClick = (event) => {
 event.preventDefault()
 dispatch(spotsActions.getSpotById(spot.id))
}


return (
 <div className="data-per-spot" onClick={handleClick}>
  <NavLink to={`/spots/${spot.id}`} className="data-per-spot">




  </NavLink>
 </div>





)
