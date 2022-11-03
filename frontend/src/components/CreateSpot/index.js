
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { createSpotThunk } from "../../store/spots";
import './createSpot.css';

function CreateSpot() {
 const dispatch = useDispatch();
 const history = useHistory();
 const sessionUser = useSelector((state) => state.session.user);

 const [address, setAddress] = useState('');
 const [city, setCity] = useState('');
 const [state, setState] = useState('');
 const [country, setCountry] = useState('');
 const [name, setName] = useState('');
 const [description, setDescription] = useState('');
 const [price, setPrice] = useState('');
 const [imageUrl, setImageUrl] = useState('');
 const [errors, setErrors] = useState([]);

 const updateAddress = (e) => setAddress(e.target.value);
 const updateCity = (e) => setCity(e.target.value);
 const updateState = (e) => setState(e.target.value);
 const updateCountry = (e) => setCountry(e.target.value);
 const updateName = (e) => setName(e.target.value);
 const updateDescription = (e) => setDescription(e.target.value);
 const updatePrice = (e) => setPrice(e.target.value);
 const updateImageUrl = (e) => setImageUrl(e.target.value);

 if (!sessionUser) return <Redirect to="/login" />;
 const submitHandler = async (e) => {
  e.preventDefault();
  setErrors([]);

  let spot = { address, city, state, country, name, description, price, imageUrl }

  if (!spot.address.length) return setErrors(['Please provide an address']);
  if (!spot.city.length) return setErrors(['Please provide a city']);
  if (!spot.state.length) return setErrors(['Please provide a state']);
  if (!spot.country.length) return setErrors(['Please provide a country']);
  if (spot.name.length < 2) return setErrors(['Name must be 2 or more characters']);
  if (!spot.description || spot.description.length < 10) return setErrors(['Please provide a description and it must be 10 or more characters']);
  if (!spot.price || spot.price < 0 || isNaN(spot.price)) return setErrors(['Price must be 1 or higher']);
  if (!spot.imageUrl.length) return setErrors(['Please provide an image']);
  if (!spot.imageUrl.includes('.jpg') && !spot.imageUrl.includes('.jpeg') && !spot.imageUrl.includes('.png')) return setErrors(['Image must be in .jpg, .jpeg, or .png format']);

  const payload = {
   address,
   city,
   state,
   country,
   name,
   description,
   price,
   imageUrl,
  };

  const createdSpot = await dispatch(createSpotThunk(payload))
  history.push('/');

  if (createdSpot) {
   history.push('/');
  }
 }
 const cancelHandler = (e) => {
  e.preventDefault();
  history.push('/');
 };

 return (
  <div className="become-host-page">
   <form className="form-create-spot" onSubmit={submitHandler}>
    <h2 className="host-text">Open your door to hosting </h2>
    <h3 className="host-text">   You can host anything, anywhere</h3>
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
    <input
     className="form-input"
     type="text"
     placeholder="previewImage"
     required
     value={imageUrl}
     onChange={updateImageUrl}
    />
    <div className="two-button">
     <button className="one-button-create" type="submit">Create A Spot</button>
     <button className="one-button-create" type="button" onClick={cancelHandler}>Cancel</button>
    </div>

   </form>
  </div>
 )



}


export default CreateSpot;
