import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect, useParams } from "react-router-dom";
import { createReviewsThunk } from "../../store/reviews";

function CreateReview() {
 const dispatch = useDispatch();
 const history = useHistory();
 const { id } = useParams()
 const sessionUser = useSelector((state) => state.session.user);

 const [review, setReview] = useState('');
 const [stars, setStars] = useState('');
 const [errors, setErrors] = useState([]);

 const updateReview = (e) => setReview(e.target.value);
 const updateStars = (e) => setStars(e.target.value);

 if (!sessionUser) return <Redirect to="/login" />;

 const submitHandler = async (e) => {
  e.preventDefault();
  setErrors([]);

  let Addreview = { review, stars }

  if (!Addreview.review.length) return setErrors(['Please provide a review']);
  if (!Addreview.stars.length) return setErrors(['Please provide a rating']);
  if (Addreview.stars < 1 || Addreview.stars > 5 || isNaN(Addreview.stars)) return setErrors(['Rating is between 1 and 5']);

  const payload = {
   review,
   stars
  };

  const createdReview = await dispatch(createReviewsThunk(payload, id))
  history.push(`/spots/${id}`);

  if (createdReview) {
   history.push(`/spots/${id}`);
  }
 }
 const cancelHandler = (e) => {
  e.preventDefault();
  history.push(`/spots/${id}`);
 };

 return (
  <div className="become-host-page">
   <form className="form-create-spot" onSubmit={submitHandler}>
    <h2 className="host-text">Create A Review </h2>

    <ul className="errors">
     {errors.length > 0 &&
      errors.map((error) => <li key={error}>{error}</li>)}
    </ul>
    <input
     className="form-input"
     type="text"
     placeholder="review"
     required
     value={review}
     onChange={updateReview}
    />
    <input
     className="form-input"
     type="text"
     placeholder="stars"
     required
     value={stars}
     onChange={updateStars}
    />

    <div className="two-button">
     <button className="one-button-create" type="submit">Submit</button>
     <button className="one-button-create" type="button" onClick={cancelHandler}>Cancel</button>
    </div>

   </form>
  </div>
 )



}


export default CreateReview;
