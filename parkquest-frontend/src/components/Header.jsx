import React from 'react';
import {Link} from 'react-router-dom';

// Header component to render the navigation bar
// Accepts 'isAuthenticated' to check if the user is logged in
// Accepts 'onLogout' as a logout function handler
const Header = ({isAuthenticated, onLogout}) => {
    return (
        <header>
            {/* Display the website name with a link */}
            <h2 id="website-name">
                {/* If the user is authenticated, link to the dashboard, otherwise link to the home page */}
                <Link to={isAuthenticated ? "/dashboard" : "/"} id="website-name">ParkQuest</Link>
            </h2>
            <div>
                {isAuthenticated ? (
                    // If the user is logged in, show Profile and Logoff buttons
                    <>
                        <button className="account-button">
                            <Link to="/profile">Profile</Link>
                        </button>
                        <button className="account-button" onClick={onLogout}>Logoff</button>
                    </>
                ) : (
                    // If the user is not logged in, show Login and Signup buttons
                    <>
                        <button className="account-button"><Link to="/login">Login</Link></button>
                        <button className="account-button"><Link to="/signup">Signup</Link></button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;