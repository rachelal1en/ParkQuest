import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Prevent blank fields
            if (!email || !username || !password || !confirmPassword) {
                setError('Please fill in all fields.');
                return;
            }

            // Password confirmation check
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            // Validate email format
            if (!isValidEmail(email)) {
                setError("Please enter a valid email address.");
                return;
            }

            // Post signup request to the backend
            const response = await axios.post('http://localhost:8081/api/auth/signup', {
                email,
                username,
                password
            }, { withCredentials: true });

            // Handle successful signup (navigate to login or dashboard)
            console.log('Signup successful:', response.data);
            navigate('/login');
        } catch (error) {
            // Handle errors returned from the backend
            console.error('Signup failed:', error.response ? error.response.data : error.message);
            setError(
                error.response?.data?.message || "Something went wrong during registration. Please try again."
            );
        }
    };

    return (
        <div className="account-forms">
            <h2>Sign up</h2>
            <br />
            <form onSubmit={handleSignup}>
                {error && <div className="error">{error}</div>} {/* Render error message */}
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit" className="outline-button">Sign up</button>
            </form>
            <div>
                <br />
                <p>Already registered? <Link to="/Login" className="not-transparent-links">Login</Link></p>
            </div>
        </div>
    );
}

export default Signup;