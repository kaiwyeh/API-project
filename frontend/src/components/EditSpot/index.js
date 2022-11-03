
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editUserSpotsThunk, getSpotsIdThunk } from "../../store/spots"
import './editSpot.css';

function EditUserSpots() {
 const dispatch = useDispatch();
 const { id } = useParams()
 useEffect(() => { dispatch(getSpotsIdThunk(id)) }, [dispatch, id]);
 const spotCurrent = useSelector((state) =>
  state.spots.singleSpot
 );

 const history = useHistory()

 const [address, setAddress] = useState('');
 const [city, setCity] = useState('');
 const [state, setState] = useState('');
 const [country, setCountry] = useState('');
 const [name, setName] = useState('');
 const [description, setDescription] = useState('');
 const [price, setPrice] = useState('');
 const [errors, setErrors] = useState([]);

 const updateAddress = (e) => setAddress(e.target.value);
 const updateCity = (e) => setCity(e.target.value);
 const updateState = (e) => setState(e.target.value);
 const updateCountry = (e) => setCountry(e.target.value);
 const updateName = (e) => setName(e.target.value);
 const updateDescription = (e) => setDescription(e.target.value);
 const updatePrice = (e) => setPrice(e.target.value);

 const img = spotCurrent?.SpotImages
 let image = []
 img?.map(im => image.push(im.url))

 useEffect(() => {
  if (spotCurrent) {
   setAddress(spotCurrent.address);
   setCity(spotCurrent.city);
   setState(spotCurrent.state);
   setCountry(spotCurrent.country);
   setName(spotCurrent.name);
   setDescription(spotCurrent.description);
   setPrice(spotCurrent.price);

  }
 }, [spotCurrent]);


 const submitHandler = async (e) => {
  e.preventDefault();
  setErrors([]);

  let spot = {
   address, city, state, country, name, description, price,

  }

  if (!spot.address.length) return setErrors(['Please provide an address']);
  if (!spot.city.length) return setErrors(['Please provide a city']);
  if (!spot.state.length) return setErrors(['Please provide a state']);
  if (!spot.country.length) return setErrors(['Please provide a country']);
  if (spot.name.length < 2) return setErrors(['Name must be 2 or more characters']);
  if (!spot.description || spot.description.length < 10) return setErrors(['Please provide a description and it must be 10 or more characters']);
  if (!spot.price || spot.price < 0 || isNaN(spot.price)) return setErrors(['Price must be 1 or higher']);

  const payload = {
   address,
   city,
   state,
   country,
   name,
   description,
   price,

  };

  let editSpot = await dispatch(editUserSpotsThunk(payload, id))
  history.push('/');

  if (editSpot) {
   setAddress(spotCurrent.address);
   setCity(spotCurrent.city);
   setState(spotCurrent.state);
   setCountry(spotCurrent.country);
   setName(spotCurrent.name);
   setDescription(spotCurrent.description);
   setPrice(spotCurrent.price);

  }
 }

 const cancelHandler = (e) => {
  e.preventDefault();
  history.push(`/spots/${id}`);
 };


 return (
  <div className="become-host-page">
   <form className="form-create-spot" onSubmit={submitHandler}>
    <h2 className="host-text">Edit the Spot </h2>

    <ul className="errors">
     {errors.length > 0 &&
      errors.map((error) => <li key={error}>{error}</li>)}
    </ul>
    <input
     className="form-input"
     type="text"
     placeholder="address"
     required
     value={address}
     onChange={updateAddress}
    />
    <input
     className="form-input"
     type="text"
     placeholder="city"
     required
     value={city}
     onChange={updateCity}
    />
    <input
     className="form-input"
     type="text"
     placeholder="state"
     required
     value={state}
     onChange={updateState}
    />
    <input
     className="form-input"
     type="text"
     placeholder="country"
     required
     value={country}
     onChange={updateCountry}
    />
    <input
     className="form-input"
     type="text"
     placeholder="name"
     required
     value={name}
     onChange={updateName}
    />
    <input
     className="form-input"
     type="text"
     placeholder="description"
     required
     value={description}
     onChange={updateDescription}
    />
    <input
     type="text"
     className="form-input"
     placeholder="price"
     required
     value={price}
     onChange={updatePrice}
    />

    <div className="two-button">
     <button className="one-button-create" type="submit">Submit </button>
     <button className="one-button-create" type="button" onClick={cancelHandler}>Cancel</button>
    </div>

   </form>
  </div>
 )
}

export default EditUserSpots;
