import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginform.css';
import user_icon from '../Assets/user.png';
import email_icon from '../Assets/mail.png';
import password_icon from '../Assets/padlock.png';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);  // Toggle between login and signup
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      // Signup logic here
      console.log('Signed up with', { email, username, password });
    } else {
      if (username === 'davis' && password === 'william') {
        navigate('/explore');  
      } else {
        setError('Invalid username or password');
      }
    }
  };

  const toggleSignup = () => {
    setIsSignup(!isSignup);
    setError('');
    setUsername('');
    setPassword('');
    setEmail('');
    setConfirmPassword('');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <div className="form-group">
              <label>Email:</label>
              <div className="input-icon">
                <img src={email_icon} alt="email icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          <div className="form-group">
            <label>Username:</label>
            <div className="input-icon">
              <img src={user_icon} alt="user icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <div className="input-icon">
              <img src={password_icon} alt="password icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {isSignup && (
            <div className="form-group">
              <label>Confirm Password:</label>
              <div className="input-icon">
                <img src={password_icon} alt="confirm password icon" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          <button type="submit" className="submit-button">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="toggle-section">
          <p>{isSignup ? 'Already have an account?' : 'Don’t have an account?'}</p>
          <button className="toggle-button" onClick={toggleSignup}>
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
