import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkReadReview } from "../../store/reviews";
import { getASpot } from "../../store/spots";
import ReviewsReadPage from "../ReviewsReadPage";

import './SpotsDetailPage.css'


const SpotsDetailPage = () => {
 const { id } = useParams()
 const dispatch = useDispatch()

 const spot = useSelector(state => state.spot[id])


 const review = useSelector(state => state.review)
 const reviewCounter = (Object.values(review).length);

 useEffect(() => {
  dispatch(getASpot(id))
  dispatch(thunkReadReview(id))
 }, [dispatch, id])



 return (
  <div className="splash-container">
   {spot && (
    <div>
     <div className="title_img_div">
      <div className="spotheadercontainer">
       <div className="detailspotname">{spot?.name}</div>
       <div className="spotavgstarrating">
        <i className="fa-solid fa-star"></i>
        &nbsp;
        {`${spot?.avgStarRating} · ${reviewCounter} reviews · ${spot.city}, ${spot.state}, ${spot.country}`}
       </div>
      </div>

      {spot.Images && (
       <div className="spotimgdiv">
        <img
         className="spotimgdetail"
         src={spot?.Images[0]?.url}
         alt="House test"
        ></img>
       </div>
      )}
      <div className="descript_pricecontainer">
       <div className="descript_container">
        <div className="descript_div">
         Entire home hosted by {spot?.Owner?.firstName}
         <i className="fa-regular fa-circle-user fa-2xl"></i>
        </div>
        <div className="secondbox_div">
         <div className="secondbox_container">
          <div>
           <i className="fa-solid fa-door-open fa-xl"></i>
          </div>
          <div className="secondbox_text">Self Check In</div>
         </div>
         <div className="secondbox_container">
          <div>
           <i className="fa-solid fa-medal fa-xl"></i>
          </div>
          <div className="secondbox_text">
           {spot?.Owner?.firstName} is a Super Host
          </div>
         </div>
         <div className="secondbox_container">
          <div>
           <i className="fa-solid fa-calendar fa-xl"></i>
          </div>
          <div className="secondbox_text">
           Free cancellation for 48 hours
          </div>
         </div>
        </div>
        <div className="spotdescript">{spot.description}</div>
        <div className="placeoffer_div">
         <h3 className="fourthbox_header">What this place offers</h3>
         <div className="placeoffer_container">
          <div className="fourthbox_div">
           <div>
            <i className="fa-solid fa-utensils fa-xl"></i>
           </div>
           <div className="fourthbox_text">Kitchen</div>
          </div>
          <div className="fourthbox_div">
           <div>
            <i className="fa-solid fa-car fa-xl"></i>
           </div>
           <div className="fourthbox_text">Parking</div>
          </div>
          <div className="fourthbox_div">
           <div>
            <i className="fa-solid fa-paw fa-xl"></i>
           </div>
           <div className="fourthbox_text">Pets allowed</div>
          </div>
          <div className="fourthbox_div">
           <div>
            <i className="fa-solid fa-wifi fa-xl"></i>
           </div>
           <div className="fourthbox_text">Wifi</div>
          </div>
          <div className="fourthbox_div">
           <div>
            <i className="fa-regular fa-snowflake fa-xl"></i>
           </div>
           <div className="fourthbox_text">Air Conditioning</div>
          </div>
          <div className="fourthbox_div">
           <div>
            <i className="fa-solid fa-tv fa-xl"></i>
           </div>
           <div className="fourthbox_text">TV</div>
          </div>
          <div className="fourthbox_div">
           <div>
            <i className="fa-solid fa-charging-station fa-xl"></i>
           </div>
           <div className="fourthbox_text">EV charger</div>
          </div>
          <div className="fourthbox_div">
           <div>
            <i className="fa-solid fa-video fa-xl"></i>
           </div>
           <div className="fourthbox_text">Security Camera</div>
          </div>
         </div>
        </div>
       </div>

       <div className="rightpricereview">
        <div className="reviewprice_container">
         <div className="reviewprice_text">
          <span className="reviewprice_span">{`$${spot.price}`}</span>
          &nbsp;night
         </div>
         <div className="avg_rating_div">
          <i className="fa-solid fa-star"></i>
          &nbsp;
          {`${spot?.avgStarRating} · ${reviewCounter} reviews`}
         </div>
        </div>

        <div className="fifthbox_maindiv">
         <div className="fifthbox_div">
          <div>{`$${spot.price} x 5 nights`}</div>
          <div>{`$${spot.price * 5}`}</div>
         </div>
         <div className="fifthbox_div">
          <div>Cleaning Fee</div>
          <div>Free</div>
         </div>
         <div className="fifthbox_div">
          <div>Service Fee</div>
          <div>Free</div>
         </div>
        </div>
        <div className="fifthbox_total">
         <div>Total before taxes</div>
         <div>{`$${spot.price * 5}`}</div>
        </div>
       </div>
      </div>

      <div className="review_container">
       <ReviewsReadPage spotId={spot.id} />
      </div>
      <div className="things_div">
       <h3 className="seventhbox_header">Things to know</h3>
       <div className="toknow_text">
        <div className="seventhbox_div">
         <div className="seventhbox_lineone">House Rules</div>
         <div className="seventhbox_icon">
          <div>
           <i className="fa-regular fa-clock"></i>
          </div>
          <div className="seventhbox_text">Check-in </div>
         </div>
         <div className="seventhbox_icon">
          <div>
           <i className="fa-regular fa-clock"></i>
          </div>
          <div className="seventhbox_text">Check-out</div>
         </div>
         <div className="seventhbox_icon">
          <div>
           <i className="fa-solid fa-ban-smoking"></i>
          </div>
          <div className="seventhbox_text">No smoking</div>
         </div>
        </div>
        <div className="seventhbox_div">
         <div className="seventhbox_lineone">
          {`Health & safety`}
         </div>
         <div className="seventhbox_icon">
          <div>
           <i className="fa-solid fa-notes-medical"></i>
          </div>
          <div className="seventhbox_text">COVID-19 safety</div>
         </div>
         <div className="seventhbox_icon">
          <div>
           <i className="fa-solid fa-video"></i>
          </div>
          <div className="seventhbox_text">Security camera</div>
         </div>
         <div className="seventhbox_icon">
          <div>
           <i className="fa-solid fa-shield-heart"></i>
          </div>
          <div className="seventhbox_text">
           Carbon monoxide alarm
          </div>
         </div>
        </div>
        <div className="seventhbox_div">
         <div className="seventhbox_lineone">
          Cancellation policy
         </div>
         <div className="seventhbox_icon">
          Free cancellation for 48 hours
         </div>
         <div className="seventhbox_icon">
          Review the Host's full cancellation policy
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}

   <div>
    <div className="footer_container">
     <div className="footer_maindiv">
      <div className="footer_div">
       &copy; 2022 TravelBnB, Inc. &nbsp;·&nbsp;
       <a
        className="github_link"
        href="https://github.com/kaiwyeh"
        target="_blank"
        rel="noopener noreferrer"
       >
        Github
       </a>
       &nbsp;·&nbsp;
       <a
        className="linkedin_link"
        href="https://www.linkedin.com/in/kaiweiyeh/"
        target="_blank"
        rel="noopener noreferrer"
       >
        LinkedIn
       </a>
       &nbsp;·&nbsp;
       <a
        className="email_link"
        href="mailto:kaiyehtw@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
       >
        Email
       </a>
      </div>
      <div>
       <i className="fa-solid fa-globe"></i>
       &nbsp;English(US) &nbsp;&nbsp;$ USD
      </div>
     </div>
    </div>
   </div>
  </div>
 );

}





export default SpotsDetailPage;