import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

import './Login.css';

function Login({ setToken }) {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const navigate = useNavigate();  // Use useNavigate instead of Navigate component

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', loginData);
      if (response.data.success) {
        alert('Login successful!');
        setToken(response.data.token);
        // Redirect to the dashboard after successful login
        navigate('/dashboard');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={loginData.username}
          onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
