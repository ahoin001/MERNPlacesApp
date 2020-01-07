import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Users from './user/pages/Users'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { NewPlace } from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces';

const App = () => {

  return <Router>

    {/* Rendered above the Links (and switch) because it will always be rendered and visible */}
    <MainNavigation />

    {/* CSS Applied to main to keep it from being below the mainnavigation componenet */}
    <main>

      {/* Switch will render component as soon as it finds a match, instead of going all the way down to redirect */}
      <Switch>

        {/* path is url received, child is component that will be returned, exact makes sure to only provide if match is exact */}
        <Route path="/" exact>
          <Users />
        </Route>

        {/* DYNAMIC ROUTE */}
        {/* ' :userID ' is a parameter in URL, that can be anything and also we can extract in the rendered component */}
        {/* ex/ /user27/places */}
        <Route path="/:userID/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        {/* If none of the routes are provided, redirect to provided path in redirect */}
        <Redirect to="/" />

      </Switch>

    </main>



  </Router>

}

export default App;
