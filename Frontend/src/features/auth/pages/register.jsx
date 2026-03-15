import React, { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/formgroup";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    console.log("Register Data:", userData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <img src="/moodify - logo.png" alt="Moodify Logo" />
        </div>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <FormGroup
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />

          <FormGroup
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <FormGroup
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button type="submit" className="button">
            Register
          </button>

          <div className="forgot-password">
            <Link to="/login">
              <span>Already have an account? </span>
              Login here
            </Link>
          </div>

          <div>
            
          </div>


        </form>
      </div>
    </div>
  );
};

export default Register;
