import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

function Register({ darkMode, onToggleDarkMode }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessageType("error");
      setMessage("Please fill in your username, email, and password.");
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/users/register",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
            role: "ADMIN",
            username: name.trim(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Registration failed. Please try again.",
        );
      }

      setMessageType("success");
      setMessage(data?.message || "Account created successfully.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      window.setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Something went wrong while registering.");
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

        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">
          Register with the FreeAPI auth endpoint.
        </p>

        {message ? (
          <p className={`auth-message ${messageType}`}>{message}</p>
        ) : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-name" className="form-label">
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
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="reg-name"
                type="text"
                className="form-input"
                placeholder="doejohn"
                autoComplete="name"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-email" className="form-label">
              Email Address
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="reg-email"
                type="email"
                className="form-input"
                placeholder="user.email@domain.com"
                autoComplete="email"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-password" className="form-label">
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
                id="reg-password"
                type="password"
                className="form-input"
                placeholder="test@123"
                autoComplete="new-password"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-confirm-password" className="form-label">
              Confirm Password
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
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </span>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="reg-confirm-password"
                type="password"
                className="form-input"
                placeholder="Re-enter password"
                autoComplete="new-password"
                disabled={loading}
              />
            </div>
          </div>

          <button id="reg-submit" type="submit" className="auth-btn">
            <span>{loading ? "Creating account..." : "Create Account"}</span>
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
          Already have an account?{" "}
          <Link to="/login" className="auth-link auth-link-strong">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
