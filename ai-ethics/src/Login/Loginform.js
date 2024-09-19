import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authManager } from '../config/firebase'; // Adjust the path as needed
import './Loginform.css';  // Reusing the same styles

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // To handle redirection after login

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authManager.loginWithEmailAndPassword(email, password);
      alert('Login successful!');
      navigate('/explore'); // Redirect to AI Ethics site (starting with "Explore" page) after successful login
    } catch (err) {
      console.error('Login failed:', err.message);
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
