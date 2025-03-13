import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import './App.css'
import ParksList from './components/ParkList';
import Login from './components/Login';
import Signup from './components/Signup';
import ParkDetail from './components/ParkDetail';

function App() {
    const history = useNavigate();
  return (
    <div className='App'>
      <header>
        <p>ParkQuest</p>
        <div>
          <a href="components/Login"><button>Login</button></a>
          <a href="components/Signup"><button>Sign up</button></a>
        </div>
      </header>

      <div className='first-page'>
        <Routes>
          <Route path="/" element={
              <div>
                <h1>Welcome to ParkQuest!</h1>
                <h3>Plan your trip to national parks with ease!</h3>
              </div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/parklist" element={<ParksList />} />
          <Route path="/parks/:id" element={<ParkDetail />} />
        </Routes>
      </div>
    </div>
  )
};

export default App;
