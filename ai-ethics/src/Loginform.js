import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation to registration
import { authManager } from './firebase'; // Adjust the path as needed
import './Loginform.css';

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const isRegistered = await authManager.isUserRegistered(email);
      if (!isRegistered) {
        alert('User not registered. Please sign up.');
        return;
      }

      await authManager.logInWithEmailAndPassword(email, password);
      alert('Login successful!');
      setIsLoggedIn(true);
      navigate('/'); // Redirect to the homepage after successful login
    } catch (err) {
      console.error('Login failed:', err.message);
      alert('Login failed: ' + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authManager.loginWithGoogle();
      alert('Google login successful!');
      setIsLoggedIn(true);
      navigate('/'); // Redirect after successful Google login
    } catch (err) {
      console.error('Google login failed:', err.message);
      alert('Google login failed: ' + err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email address to reset your password.');
      return;
    }

    try {
      await authManager.sendPasswordReset(email);
      alert('If an account with that email exists, a password reset link has been sent.');
    } catch (err) {
      console.error('Password reset failed:', err.message);
      alert('Error sending password reset email: ' + err.message);
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
      <p className="redirect-text">
        Don't have an account? <Link to="/register">Sign up here</Link>
      </p>
      <button type="button" className="forgot-password-button" onClick={handleForgotPassword}>
        Forgot Password?
      </button>
      <button onClick={() => navigate('/')} className="back-to-home-button">Back to Homepage</button>
    </div>
  );
};

export default LoginForm;
