// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return {
    ...context,
    isAuthenticated: !!context.user
  };
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const navigate = useNavigate();

  
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenExpiration = JSON.parse(atob(token.split(".")[1])).exp * 1000;
      if (Date.now() > tokenExpiration) {
        logout();
      }
      axios.defaults.headers.common["x-auth-token"] = token;
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
    setLoading(false); // Set loading to false after checking token
  }, []);

  const login = async (username, password) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["x-auth-token"] = res.data.token;
    const decoded = jwtDecode(res.data.token);
    setUser(decoded);
    navigate("/products");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
