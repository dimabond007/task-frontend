import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);
const USER_URL = "http://localhost:3000/api/auth/user";
const REFRESH_URL = "http://localhost:3000/api/auth/refresh";

export const UserProvider = ({ children }) => {
  const [token, setUserToken] = useState(null);
  const [error, setError] = useState(null);

  const login = (userToken) => {
    localStorage.setItem("token", userToken);
    setUserToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
  };

  const getUser = async (userToken) => {
    if (!userToken) return null;

    try {
      const res = await axios.post(USER_URL, { token: userToken });
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("401");
        logout();
      }
      // setError("Authentication failed");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, login, logout, getUser, error }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("This context should be used only inside UserProvider");
  }
  return context;
}
