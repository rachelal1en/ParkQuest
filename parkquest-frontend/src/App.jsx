
// import reactLogo from './assets/react.svg'
import './App.css'
import ParksList from './components/ParkList';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ParkDetail from './components/ParkDetail';

function App() {

  return (
    <div className='App'>
      <header>
        <p>ParkQuest</p>
        <div>
          <button>Logout</button>
          <button>Sign up</button>
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
}

export default App;
