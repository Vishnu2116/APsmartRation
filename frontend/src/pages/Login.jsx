import React, { useState } from "react";
import "../assets/Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("loggedInUser", res.data.username);
      toast.success("Login successful!");
      navigate("/dashboard", { replace: true });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <div className="left">
        <img src="/andhraPradesh.png" alt="Smart Grocer Logo" />
      </div>
      <div className="right">
        <div className="title" style={{ textAlign: "center" }}>
          <h1>Smart Grocer</h1>
        </div>
        <form onSubmit={handleLogin} style={{ textAlign: "center" }}>
          <div className="formuptext">
            <h1>Sign In</h1>
            <h5>Log in to your account</h5>
          </div>

          <label style={{ textAlign: "left" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label style={{ textAlign: "left" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
}
