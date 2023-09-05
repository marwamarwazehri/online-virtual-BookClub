import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate} from 'react-router-dom';

export const AuthContext = createContext();
//makeRequest
const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/reviewsBook",
  withCredentials: true,
});

export const AuthContexProvider = ({ children }) => {
   
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null  
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs);
    return res.data;
  };

  const logout = async (inputs) => {
    await axios.post("http://localhost:8800/api/auth/logout");
    setCurrentUser(null);
   
    };

  useEffect(() => { 
    localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);


 
  return (
    <AuthContext.Provider value={{ currentUser, login, logout,setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
