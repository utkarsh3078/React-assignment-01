import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

function Login({ darkMode, onToggleDarkMode }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !password.trim()) {
      setMessageType("error");
      setMessage("Please enter both your username and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/users/login",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            password,
            username: userName.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed. Please try again.");
      }

      setMessageType("success");
      setMessage(data?.message || "Login successful.");
      setPassword("");

      window.setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Something went wrong while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-blob auth-blob-one" />
      <div className="auth-blob auth-blob-two" />

      <div className="auth-card">
        <div className="auth-topbar">
          <button
            type="button"
            className="auth-mode-toggle"
            onClick={onToggleDarkMode}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">
          Sign in with your username and password.
        </p>

        {message ? (
          <p className={`auth-message ${messageType}`}>{message}</p>
        ) : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-username" className="form-label">
              Username
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="login-username"
                type="text"
                className="form-input"
                placeholder="Enter your username"
                autoComplete="username"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="login-password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
          </div>

          <button id="login-submit" type="submit" className="auth-btn">
            <span>{loading ? "Signing in..." : "Sign In"}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="auth-link auth-link-strong">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
