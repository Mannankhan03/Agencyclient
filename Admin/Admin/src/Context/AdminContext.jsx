import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Admincontext = createContext();

// we can add all APIs here itself for re-usable in all components but for time being i have stored token

const AdmincontextProvider = (props) => {
  const navigate = useNavigate();
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const value = {
    aToken,
    setAToken,
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("aToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const expiryTime = decoded.exp * 1000;
        const currentTime = Date.now();

        if (expiryTime < currentTime) {
          handleLogout();
        } else {
          setAToken(storedToken);
          const timeout = setTimeout(() => {
            handleLogout();
          }, expiryTime - currentTime);
          return () => clearTimeout(timeout);
        }
      } catch (err) {
        console.error("Invalid aToken", err);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    setAToken("");
    localStorage.removeItem("aToken");
    toast.error("Session expired. Please login again.", {
      position: "top-center",
      autoClose: 1000,
    });
    navigate("/login");
  };

  return (
    <Admincontext.Provider value={value}>
      {props.children}
    </Admincontext.Provider>
  );
};

export default AdmincontextProvider;
