
// import reactLogo from './assets/react.svg'
import './App.css'
import ParksList from './components/ParkList';
import { Route, Routes, useLocation, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ParkDetail from './components/ParkDetail';
import FavoritesList from './components/FavoritesList';

function App() {
  const location = useLocation(); // Get current route
  const isHomePage = location.pathname === "/"; // Check if on home page

  return (
    <div className='App'>
      <header>
        <h2>ParkQuest</h2>
        <div>
          <button>Logout</button>
          <button>Sign up</button>
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
}

export default App;
