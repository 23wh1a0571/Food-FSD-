// File: src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      alert(`Welcome back, ${email.split("@")[0]}!`);
      navigate("/");
      window.location.reload(); // Refresh to update UI (like navbar)
    } else {
      alert("Please enter a valid email and password.");
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/image.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login-container">
        <h2 className="login-title">🔐 Login to Your Account</h2>
        <p className="login-subtext">🍲 Access your saved recipes and more.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">
            Email
            <input
              type="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          <label className="login-label">
            Password
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </label>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <a href="/register">Register here</a>.
        </p>
      </div>
    </div>
  );
};

export default Login;