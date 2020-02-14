/*
Need to improve: 
1. Understand React Portals use and function better

*/

import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import AuthContext from './shared/components/context/auth-context'

import Users from './user/pages/Users'
import Authenticate from './user/pages/Authenticate'
import MainNavigation from './shared/components/Navigation/MainNavigation'
import { NewPlace } from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';

const App = () => {

  /*
   State to pass if user is loggedIn to any component that needs the info
  */
  const [isLoggedIn, setisLoggedIn] = useState(false)

  // Will be used in context to keep track of unique users signed in
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid) => {

    setisLoggedIn(true);
    // 
    setUserId(uid);
  }, [])

  const logout = useCallback(() => {
    setisLoggedIn(false)
    // 
    setUserId(null);
  }, []
  )

  let routes;

  /*
   Have different routes and redirects if user is logged in
  */
  if (isLoggedIn) {
    routes = (

      // Switch will render first matching path, Router would possibly render multiple (ex: /places/new and /places/:placeId would both render
      <Switch>

        {/* path is url received, child is component that will be returned, exact makes sure to only provide if match is exact */}
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/newplace" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />

      </Switch>

    )

  }
  else {
    routes = (

      <Switch>

        <Route path="/" exact>
          <Users />
        </Route>

        {/* DYNAMIC ROUTE */}
        {/* ' :userID ' is a parameter in URL, that can be anything and also we can extract in the rendered component */}
        {/* ex/ /user27/places */}
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>

        <Route path="/auth" exact>
          <Authenticate />
        </Route>

        {/* Redirect to auth if no match  */}
        <Redirect to='/auth' />

      </Switch>

    )
  }

  return (

    // Context Object has a react property called Provider
    // It allows consuming components to 'listen' to context changes.
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      userId: userId,
      login: login,
      logout: logout
    }}>

      <Router>

        {/* Rendered above the Links (and switch) because it will always be rendered and visible */}
        <MainNavigation />

        <main>

          {routes}

        </main>

      </Router>

    </AuthContext.Provider>
  )

}

export default App;
