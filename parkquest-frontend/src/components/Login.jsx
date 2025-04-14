import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton.jsx";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Email validation helper function
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Prevent blanks
      if (!email || !password) {
        setError("Please fill in all fields.");
        return;
      }

      // Validate email format
      if (!isValidEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }

      // Make login request to the backend
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          email,
          password,
        }
      );

      // Assuming the backend responds with token, userId, and isAdmin flag
      const { token, userId, isAdmin } = response.data;

      if (token && userId !== undefined && isAdmin !== undefined) {
        console.log("Token received from backend:", token);
        console.log("UserId received from backend:", userId);

        // Save the token and userId to local storage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);

        // Save the isAdmin flag to local storage
        localStorage.setItem("isAdmin", isAdmin); // Save isAdmin

        setIsAuthenticated(true); // Update authentication state
        navigate("/Dashboard"); // Redirect to dashboard
      } else {
        setError("Token, userId, or isAdmin missing in backend response.");
      }
    } catch (error) {
      console.error("Login request failed:", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          "An error occurred while logging in. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="account-forms">
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {/* Renders error message */}
          {error && <div className="error">{error}</div>}
          <button className="outline-button" type="submit">
            Login
          </button>
        </form>
        <div>
          <GoogleOAuthProvider clientId="431740330929-ojmhr2kpqa7ocfbfcte5s396mrr0l6hu.apps.googleusercontent.com">
            <GoogleLoginButton />
          </GoogleOAuthProvider>
        </div>
        <div>
          <br />
          <p>
            Not Registered?{" "}
            <Link to="/Signup" className="not-transparent-links">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
