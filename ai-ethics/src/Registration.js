import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authManager } from './firebase';
import './styles/Loginform.css'; 

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const isRegistered = await authManager.isUserRegistered(email);
      if (isRegistered) {
        alert("Email is already in use. Please log in.");
        return;
      }

      await authManager.registerWithEmailAndPassword(name, email, password);
      await authManager.logout();
      
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err.message);
      alert('Registration failed: ' + err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
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
        <button type="submit" className="login-button">Register</button>
      </form>
      <p className="redirect-text">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Registration;
