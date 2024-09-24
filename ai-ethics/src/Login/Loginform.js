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

    // Input validation
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      // Check if the user is registered in Firestore
      const isRegistered = await authManager.isUserRegistered(email);
      
      if (!isRegistered) {
        alert('User not registered. Please sign up.');
        return;
      }

      // Proceed with login if the user is registered
      await authManager.logInWithEmailAndPassword(email, password);
      alert('Login successful!');
      navigate('/explore'); // Redirect to AI Ethics site after successful login
    } catch (err) {
      console.error('Login failed:', err.message);
      alert('Login failed: ' + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authManager.loginWithGoogle();
      alert('Google login successful!');
      navigate('/explore'); // Redirect after Google login
    } catch (err) {
      console.error('Google login failed:', err.message);
      alert('Google login failed: ' + err.message);
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
        <button type="button" className="google-login-button" onClick={handleGoogleLogin}>
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
