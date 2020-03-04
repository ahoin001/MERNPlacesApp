/*
Need to improve: 
1. Understand React Portals use and it's use better
2. Develop a deeper understanding of custom hooks

*/

import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import useAuth from './shared/components/hooks/auth-hook'

import AuthContext from './shared/components/context/auth-context'
import MainNavigation from './shared/components/Navigation/MainNavigation'

import Users from './user/pages/Users'
// import Authenticate from './user/pages/Authenticate'
// import NewPlace from './places/pages/NewPlace'
// import UserPlaces from './places/pages/UserPlaces';
// import UpdatePlace from './places/pages/UpdatePlace';

// ** NOTE Lazy load to only import and load routes when necessary
// Only possible for react routes component rendering
const Authenticate = React.lazy(() => import('./user/pages/Authenticate'))
const NewPlace = React.lazy(() => import('./places/pages/UserPlaces'))
const UserPlaces = React.lazy(() => import('./user/pages/Users'))
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'))

const App = () => {

  // Hook that handles authentication
  const { token, login, logout, userId } = useAuth()

  let routes;

  /*
   Have different routes and redirects if user is logged in
  */
  if (token) {
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
      isLoggedIn: !!token, // the !! converts to boolean
      token: token,
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
