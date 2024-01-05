import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  // because of this callBack, login runs once and not infinite
  const login = useCallback((uid, token, expirationDate) => {
    // setIsLoggedIn(true);
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // it gives us the
    // expirationDate || new Date(new Date().getTime() + 2000); // it gives us the
    // current time plus one hour!
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);
  // everytime token changes, timer will runs.

  // Auto-login when we reload the Page:=> App.jsx as first page runs and login as dependency to this
  // to this useEffect after compiler rans all other codes in this page!
  // React runs all the rest of the Program firstly and then runs this useEffect()
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData")); // to convert JSON to normal
    // object in JavaScript - storedData is what i get from LocalStorage in Browser!
    if (
      storedData &&
      storedData.token &&
      // if remaining Time is greater than the current time? we are still logged in!
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);
  return { token, userId, login, logout };
};
