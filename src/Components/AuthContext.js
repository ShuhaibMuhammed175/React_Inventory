import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  const [user, setUser] = useState(() =>
    authToken ? jwtDecode(authToken.access) : null
  );
  const [userId, setUserId] = useState(() => (user ? user.user_id : null));
  const [errorMessage, setErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/register/",
        userData
      );
      if (response.status === 201) {
        navigate("/");
        console.log("SUCCESS", response.data);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage("User with this email already exists");
      } else {
        setErrorMessage("An unexpected error occurred during registration");
      }
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/token/",
        {
          email: e.target.email.value,
          password: e.target.password.value,
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setAuthToken(data);
        const decodedToken = jwtDecode(data.access);
        setUser(decodedToken);
        setUserId(decodedToken.user_id);
        localStorage.setItem("authToken", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setLoginErrorMessage("User not found");
      }
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setUser(null);
    setUserId(null);
    navigate("/login");
    localStorage.removeItem("authToken");
  };

  const updateToken = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/token/refresh/",
        {
          refresh: String(authToken.refresh),
        }
      );
      if (response.status === 200) {
        const data = response.data;
        setAuthToken(data);
        const decodedToken = jwtDecode(data.access);
        setUser(decodedToken);
        setUserId(decodedToken.user_id);
        localStorage.setItem("authToken", JSON.stringify(data));
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Error occurred during token refresh:", error);
      logoutUser();
      navigate("/login");
    }
  };

  useEffect(() => {
    const time = 1000 * 60 * 20;
    const interval = setInterval(() => {
      if (authToken) {
        updateToken();
      }
    }, time);
    return () => clearInterval(interval);
  }, [authToken]);

  const contextData = {
    user,
    userId,
    registerUser,
    loginUser,
    logoutUser,
    updateToken,
    authToken,
    errorMessage,
    loginErrorMessage,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
