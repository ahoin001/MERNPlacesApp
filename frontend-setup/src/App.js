/*
Need to improve: 
1. Understand React Portals use and function better

*/

import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Users from './user/pages/Users'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { NewPlace } from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';

const App = () => {

  return <Router>

    {/* Rendered above the Links (and switch) because it will always be rendered and visible */}
    <MainNavigation />

    {/* CSS Applied to main to keep it from being below the mainnavigation componenet */}
    <main>

      {/* Switch will render first matching path, Router would possibly render multiple (ex/ /places/new and /places/:placeId would both render */}
      <Switch>

        {/* path is url received, child is component that will be returned, exact makes sure to only provide if match is exact */}
        <Route path="/" exact>
          <Users />
        </Route>

        {/* DYNAMIC ROUTE */}
        {/* ' :userID ' is a parameter in URL, that can be anything and also we can extract in the rendered component */}
        {/* ex/ /user27/places */}
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>

        {/* If none of the routes are provided, redirect to provided path in redirect */}
        <Redirect to="//places/:placeId/" />

      </Switch>

    </main>



  </Router>

}

export default App;
