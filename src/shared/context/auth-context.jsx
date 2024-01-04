import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  // default value for token
  token: null,
  login: () => {},
  logout: () => {},
});
