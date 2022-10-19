import React, { useState, useEffect } from 'react';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './SpotCreateComp.css';
import * as reviewActions from '../../store/reviews';
import { useHistory } from 'react-router-dom';
import { createASpot } from '../../store/spots';

const SpotCreateComp = ({ hideModal }) => {
 const dispatch = useDispatch()
 const history = useHistory()

 //API doc, w14 PA
 const [address, setAddress] = useState('')
 const [city, setCity] = useState('')
 const [state, setState] = useState('')
 const [country, setCountry] = useState('')
 const [lat, setLat] = useState('')
 const [lng, setLng] = useState('')
 const [name, setName] = useState('')
 const [description, setDescription] = useState('')
 const [price, setPrice] = useState('')
 const [previewImage, setPreviewImage] = useState('')
 const [submitted, setSubmitted] = useState('')
 const [validationErrors, setValidationErrors] = useState([])

 useEffect(() => {
  const errors = []

  if (!address) {
   errors.push("Street address is required")
  }
  if (!city) {
   errors.push("City is required")
  }
  if (!state) {
   errors.push("State is required")
  }
  if (!country) {
   errors.push("Country is required")
  }
  if (!lat) {
   errors.push("Latitude is not valid")
  }
  if (!lng) {
   errors.push("Longitude is not valid")
  }
  if (name.length > 50) {
   errors.push("Name must be less than 50 characters")
  }
  if (!description) {
   errors.push("Description is required")
  }
  if (!price) {
   errors.push("Price per day is required")
  } else if (price <= 0) {
   errors.push("Price per day has to be greater than 0")
  }

  setValidationErrors(errors)

 }, [address, city, state, country, lat, lng, name, description, price, previewImage])

 const submitHandler = (e) => {
  e.preventDefault()

  //console.log({ address, city, state, country, lat, lng, name, description, price, previewImage })
  //history.push('/')
  setSubmitted(!submitted)
  const data = {
   address,
   city,
   state,
   country,
   lat,
   lng,
   name,
   description,
   price,
   previewImage: previewImage
  }
 }

 let createdNewSpot = await dispatch(createASpot(data))

 if (createdNewSpot) {
  history.push(`/spots/${createdNewSpot.id}`)
  hideModal(false)
 }


 return (
  <div>
   <div>
    <button onClick={() => hideModal(false)}>

    </button>
    <div>Create Spot</div>
   </div>
   <form onSubmit={submitHandler}>
    {(validationErrors.length > 0 && submitted === true) && (
     <div>
      <div>
       {validationErrors.map((error, i) => (
        <div key={i}>{error}</div>
       ))}
      </div>
     </div>
    )}
    <div>
     <div>
      <input
       className='createCity'
       type='text'
       placeholder='City'
       value={city}
       onChange={(e) => setCity(e.target.value)}
      />
     </div>
     <div>
      <input
       className='createState'
       type='text'
       placeholder='State'
       value={state}
       onChange={(e) => setState(e.target.value)}
      />
     </div>
     <div>
      <input
       className='createCountry'
       type='text'
       placeholder='Country'
       value={country}
       onChange={(e) => setCountry(e.target.value)}
      />
     </div>
     <div>
      <input
       className='createLat'
       type='text'
       placeholder='Lat'
       value={lat}
       onChange={(e) => setLat(e.target.value)}
      />
     </div>
     <div>
      <input
       className='createLng'
       type='text'
       placeholder='Lng'
       value={lat}
       onChange={(e) => setLng(e.target.value)}
      />
     </div>
     <div>
      <input
       className='createPlaceName'
       type='text'
       placeholder='Place'
       value={name}
       onChange={(e) => setName(e.target.value)}
      />
     </div>
     <div>
      <testarea
       className='createdescription'
       type='text-area'
       placeholder='description'
       value={description}
       onChange={(e) => setDescription(e.target.value)}
      />
     </div>
     <div>
      <input
       className='createImage'
       type='text'
       placeholder='Image'
       value={previewImage}
       onChange={(e) => setPreviewImage(e.target.value)}
      />
     </div>
     <div>
      <input
       className='createPrice'
       type='text'
       placeholder='Price'
       value={price}
       onChange={(e) => setPrice(e.target.value)}
      />
     </div>
    </div>
    <button
     className='createSpotButton'
     type='submit'
     disabled={validationErrors.length > 0 && submitted}
    >
     Create New Spot
    </button>
   </form >
  </div >
 )
}


export default SpotCreateComp











// import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

// const COLORS = [
//   "red",
//   "orange",
//   "yellow",
//   "green",
//   "blue",
//   "purple"
// ];

// function FruitForm({ fruits }) {
//   const [name, setName] = useState("");
//   const [sweetness, setSweetness] = useState(1);
//   const [color, setColor] = useState(COLORS[0]);
//   const [seeds, setSeeds] = useState("yes");
//   const [errors, setErrors] = useState([]);
//   const history = useHistory();
//   const fruitNames = fruits.map(fruit => fruit.name);

//   useEffect(() => {
//     const validationErrors = [];
//     if (name.length < 3) validationErrors.push("Name must be 3 or more characters");
//     if (name.length > 20) validationErrors.push("Name must be 20 characters or less");
//     if (fruitNames.includes(name)) validationErrors.push("Name already exists.");
//     if (sweetness < 1 || sweetness > 10) validationErrors.push("Sweetness must be between 1 and 10");
//     setErrors(validationErrors);
//   }, [name, sweetness]);



//   const handleSubmit = () => {

//     //e.preventDefault();
//     const formValues = {
//       name,
//       sweetness,
//       color,
//       seeds
//     };

//     console.log(formValues)

//     history.push('/')
//   }

//   return (
//     <form
//       className="fruit-form"
//       onSubmit={handleSubmit}
//     >
//       <h2>Enter a Fruit</h2>
//       <ul className="errors">
//         {errors.map(error => (     //use () OR LEAVE IT BLANK!!!! NOT {}
//           <li key={error}>{error}</li>
//         ))}
//       </ul>
//       <label>
//         Name
//         <input
//           type="text"
//           name="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <label>
//         Select a Color
//         <select value={color} onChange={(e) => setColor(e.target.value)}
//         >
//           {COLORS.map(color => (
//             <option
//               key={color}
//               value={color}
//             >
//               {color}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Sweetness
//         <input
//           type="number"
//           name="sweetness"
//           value={sweetness}
//           onChange={(e) => setSweetness(e.target.value)}
//         />
//       </label>
//       <label>
//         <input
//           type="radio"
//           value="no"
//           name="seeds"
//           onChange={(e) => setSeeds(e.target.value)}
//           checked={seeds === "no"}
//         />
//         No Seeds
//       </label>
//       <label>
//         <input
//           type="radio"
//           value="yes"
//           name="seeds"
//           onChange={(e) => setSeeds(e.target.value)}
//           checked={seeds === "yes"}
//         />
//         Seeds
//       </label>
//       <button
//         type="submit"
//         disabled={errors.length > 0}
//       >
//         Submit Fruit
//       </button>
//     </form>
//   );
// }

// export default FruitForm;
