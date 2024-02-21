// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import About from './components/About';
import Dashboard from './components/Dashboard';
import AddEmployee from './components/AddEmployee';

import './components/App.css'; 


// Import the CSS file

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/about">About</Link></li>
            <ul>
  {/* ... other navigation items */}
  <li><Link to="/AddEmployee">Add Employee</Link></li>
</ul>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/AddEmployee" element={<AddEmployee />} />
           
      

      </Routes>
            
        </div>
      </div>
    </Router>
  );
}

export default App;
