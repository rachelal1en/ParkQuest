import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

     try{
            //prevents blanks
            if (!email || ! password){
                setError('Please fill in all fields.');
                return;
                }
            //is an actual email
             if (!isValidEmail(email)) {
                    setError("Please enter a valid email address");
                    return;
                }
//             const response = await axios.post('//TOTO: Add in Database, {
//                 email,
//                 password
//                 });
                //Handle successful login
                console.log('Login successful:', response.data);
                history('/App');
        } catch (error){
                //handles errors
                console.error('Login failed:', error.response ? error.response.data : error.message);
                setError(error.response ? error.response.data : error.message);
                }
            };

    return(
        <div>
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
                {/* renders error message */}
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
            <div>
                <p>Not Registered? <a href="/signup">Register</a></p>
            </div>
        </div>
    );
}

export default Login;