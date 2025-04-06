import React, {useState} from 'react';
import {Route, Routes, useLocation, Link, useNavigate} from 'react-router-dom';
import '../App.css'
import App from '../App';
import ParksList from './ParkList/ParksList';
import ParkDetail from './ParkDetail/ParkDetail';
import FavoritesList from './FavoritesList/FavoritesList';
import Campgrounds from './CampgroundsList/CampgroundsList';
import CampgroundDetail from './CampgroundDetail/CampgroundDetail';


function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route
    const [error, setError] = useState(null);

    return (
        <div>
            <div>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h1>Welcome to ParkQuest!</h1>
                            <br/>
                            <h3>Plan your trip to national parks with ease!</h3>
                            <br/><br/>
                            <div>
                                <button className="outline-button">
                                    <Link to="/parklist">Search Parks</Link>
                                </button>
                                <button className="outline-button">
                                    <Link to="/favorites">My Favorite Parks</Link>
                                </button>
                            </div>
                            </div>
                            }/>
                        </ Routes>
                        </div>
                        </div>
                        );
            }

export default Dashboard;