import React, { Component, Fragment, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import actions from "./services/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";

const App = () => {
  
  let [user, setUser] = useState(null)

  useEffect(() => {
    async function getUser() {
      let user = await actions.getUser();
      console.log('user is',user)
      setUser(user?.data)
    }
    getUser();    
  }, [])

  const logOut = async () => {
    let res = await actions.logOut();
    setUser(null);
  };

  return(
    <BrowserRouter>
      {user?.email}
      <nav>
        <NavLink to="/">Home ||</NavLink>

        {user ? (
          <Fragment>
            <NavLink onClick={logOut} to="/">
              Log Out |
            </NavLink>
            <NavLink to="/profile">Profile||</NavLink>
          </Fragment>
          ) : (
          <Fragment>
            <NavLink to="/sign-up">Sign Up |</NavLink>
            <NavLink to="/log-in">Log In |</NavLink>
          </Fragment>
        )}
      </nav>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route
          exact
          path="/sign-up"
          render={(props) => <SignUp {...props} setUser={setUser} />}
        />
        <Route
          exact
          path="/log-in"
          render={(props) => <LogIn {...props} setUser={setUser} />}
        />
        <Route
          exact
          path="/profile"
          render={(props) => <Profile {...props} user={user} />}
        />

        <Route component={NotFound} />
      </Switch>
      {!user && <GoogleAuth setUser={setUser} />}
      {!user && <GoogleAuthLogin setUser={setUser} />}
    </BrowserRouter>
  )

}
export default App;
