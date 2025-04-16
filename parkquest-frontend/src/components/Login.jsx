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

  // Handle form submission when a user attempts to log in
  const handleSubmit = async (e) => {
    //prevents default form submission
    e.preventDefault();
    //clear old error messages
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

      // extract and validate the backend response
      const { token, userId, isAdmin } = response.data;

      if (token && userId !== undefined && isAdmin !== undefined) {
        console.log("Token received from backend:", token);
        console.log("UserId received from backend:", userId);

        // Save the token, userId, and isAdmin flag to local storage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("isAdmin", isAdmin); // Save isAdmin

        setIsAuthenticated(true);
        navigate("/Dashboard"); // Redirect to dashboard
      } else {
        //if any required field is missing in the response
        setError("Token, userId, or isAdmin missing in backend response.");
      }
    } catch (error) {
      //log the error and display an error message to the user
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
        {/*<div>*/}
        {/*  <GoogleOAuthProvider clientId="431740330929-ojmhr2kpqa7ocfbfcte5s396mrr0l6hu.apps.googleusercontent.com">*/}
        {/*    <GoogleLoginButton />*/}
        {/*  </GoogleOAuthProvider>*/}
        {/*</div>*/}
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
