import { NavLink } from "react-router-dom";
import "./pagenotfound.css"


const PageNotFound = () => {
 return (
  <div>
   <div className="pagenotfound_container">
    <h1>Page Not Found</h1>
    <NavLink className="pagenotfound_link" to={"/"}>
     <img
      className="doggo_img"
      src="https://images.pexels.com/photos/1629780/pexels-photo-1629780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="404"
     ></img>
     <div className="pagenotfound_secondline">
      Click me to go back home...
     </div>
    </NavLink>
   </div>
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

export default PageNotFound;
