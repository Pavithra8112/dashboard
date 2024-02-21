
// client/src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [registerData, setRegisterData] = useState({ username: '', password: '', role: '' });

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3000/register', registerData);
      if (response.data.success) {
        alert('Registration successful!');
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          value={registerData.role}
          onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;