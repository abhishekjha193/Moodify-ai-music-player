import React, { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/formgroup";
import { Link, useNavigate } from "react-router-dom";
import { useauth } from "../hooks/useauth";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useauth();
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  async function handlesubmit(e) {
    e.preventDefault();

    if (!isValidEmail(email)) {
      alert("Enter valid email");
      return;
    }

    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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

        <h2>Welcome Back</h2>

        <form onSubmit={handlesubmit}>
          <FormGroup
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
            autoComplete="username"
          />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}

          <FormGroup
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            autoComplete="current-password"
          />

          <button type="submit" className="button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="forgot-password">
            <div>
              <Link to="/register">
                <span>Don't Have Account ? </span>
                Please Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
