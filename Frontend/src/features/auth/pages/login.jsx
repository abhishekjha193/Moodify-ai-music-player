import React, { useState } from "react";
import "../style/login.scss";
import FormGroup from "../components/formgroup";
import { Link, useNavigate } from "react-router-dom";
import { useauth } from "../hooks/useauth";

const Login = () => {

  const navigate = useNavigate();
  const { loading, handleLogin } = useauth();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  async function handlesubmit(e) {
    e.preventDefault();

    await handleLogin({ email, password });

    navigate("/");
  }

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
            onChange={(e) => setemail(e.target.value)}
            autoComplete="username"
          />

          <FormGroup
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="forgot-password">

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

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