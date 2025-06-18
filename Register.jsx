import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", form.email);
    alert(`Welcome, ${form.name}!`);
    navigate("/");
    window.location.reload(); // to refresh navbar if needed
  };

  return (
    <div
      className="register-wrapper"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/image.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="register-card">
        <h2 className="register-title">📝 Create an Account</h2>
        <p className="register-subtext">
          Join us to explore and save your favorite recipes!
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="register-label">
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="Your name"
            />
          </label>

          <label className="register-label">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="you@example.com"
            />
          </label>

          <label className="register-label">
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="********"
            />
          </label>

          <label className="register-label">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="********"
            />
          </label>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <a href="/login">Login here</a>.
        </p>
      </div>
    </div>
  );
}
