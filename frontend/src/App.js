
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import GetAllSpots from "./components/Spots";
import GetSpot from './components/SpotsID';
import CreateSpot from './components/CreateSpot'
import GetUserSpots from './components/UserSpot'
import EditUserSpots from './components/EditSpot'
import CreateReview from './components/CreateReview'
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/spots/current">
            <GetUserSpots />
          </Route>
          <Route path="/spots/:id/edit">
            <EditUserSpots />
          </Route>
          <Route exact path="/">
            <GetAllSpots />
          </Route>
          <Route path="/spots/:id/addReview">
            <CreateReview />
          </Route>
          <Route path="/spots/:id">
            <GetSpot />
          </Route>
          <Route path="/BecomeAHost">
            <CreateSpot />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
