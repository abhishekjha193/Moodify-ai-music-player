import React, { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/formgroup";
import { Link, useNavigate } from "react-router-dom";
import { useauth } from "../hooks/useauth";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, loading } = useauth();
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await handleRegister({
        username,
        email,
        password,
      });

      navigate("/login");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  }

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!isValidEmail(value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormGroup
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}

          <FormGroup
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="button">
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="forgot-password">
            <Link to="/login">Already have an account? Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
