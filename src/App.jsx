import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Users } from "./user/pages/Users";
import { NewPlace } from "./places/pages/NewPlace";
import { MainNavigation } from "./shared/components/Navigation/MainNavigation";
import { UserPlaces } from "./places/pages/UserPlaces";
import { UpdatePlace } from "./places/pages/UpdatePlace";
import { Auth } from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  // because of this callBack, login runs once and not infinite
  const login = useCallback((uid, token) => {
    // setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token })
    );
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  // Auto-login when we reload the Page:=> App.jsx as first page runs and login as dependency to this
  // to this useEffect after compiler rans all other codes in this page!
  // React runs all the rest of the Program firstly and then runs this useEffect()
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")); // to convert JSON to normal
    // object in JavaScript - storedData is what i get from LocalStorage in Browser!
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  let routes;
  // if (isLoggedIn) {
  if (token) {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        // isLoggedIn: isLoggedIn,
        isLoggedIn: !!token, // !! will convert it to the True if it is a token or string,
        // unless false, if it is null
        // we save token here in a variable with the same name to use it later!
        // its default value stored in auth-context.jsx => token:null
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            {routes}
            {/* <Route path="/" element={<Users />} />
            <Route path="/:userId/places" element={<UserPlaces />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/places/:placeId" element={<UpdatePlace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
