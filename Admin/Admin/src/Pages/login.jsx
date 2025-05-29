import React, { useContext, useState } from "react";
import { Admincontext } from "../Context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import "../Pages/login.css";

const Login = () => {
  const { setAToken } = useContext(Admincontext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmithandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
        toast.success(data.message || "Login successful");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || "Login failed"
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    }
  };

  return (
    <div className="admin-background-image">
      <form className="login-form" onSubmit={onSubmithandler}>
        <div className="login-form-container">
          <h2>Login</h2>
          <div className="login-form-input">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-form-input">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
