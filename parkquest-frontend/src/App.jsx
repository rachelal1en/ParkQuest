import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import './App.css'
import ParksList from './components/ParkList';
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ParkDetail from './components/ParkDetail';
import FavoritesList from './components/FavoritesList';

function App() {

  const history = useNavigate();
  const location = useLocation(); // Get current route
  const isHomePage = location.pathname === "/"; // Check if on home page

  return (
    <div className='App'>
      <header>
        <h2>ParkQuest</h2>
        <div>
          <a href="components/Login"><button>Login</button></a>
          <a href="components/Signup"><button>Sign up</button></a>
        </div>
      </header>

      <div className={isHomePage ? 'first-page' : ''}>
        <Routes>
          <Route path="/" element={
              <div>
                <h1>Welcome to ParkQuest!</h1>
                <h3>Plan your trip to national parks with ease!</h3>
                <button>
                  <Link to="/favorites">My Favorite Parks</Link>
                </button>
              </div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/parklist" element={<ParksList />} />
          <Route path="/parks/:id" element={<ParkDetail />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </div>
  )
};

export default App;
