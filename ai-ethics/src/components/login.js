import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authManager } from '../firebase';
import googleLogo from '../google.png';
import eyeIcon from '../eye.png';
import "../styles/account.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
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
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authManager.loginWithGoogle();
      alert('Google login successful!');
      setIsLoggedIn(true);
      navigate('/');
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
    <div className="account-container">
       <div className="top-right-link">
        <Link to="/welcome">Back to Welcome</Link>
      </div>
      <div className="text-container">
        <div className="text-title">Master AI with ethical integrity</div>
        <div className="text-description">
          Step into the future of technology by learning how to build AI systems that are fair, transparent, and accountable. Join us and become a leader in responsible AI development.
        </div>
      </div>
      <div className="input-container">
        <div className="form-header">Log in</div>
        <div className="form-sub-text">
          Need an account? <Link to="/signup">Sign up</Link>
        </div>
        <form className="form-container column" onSubmit={handleLogin}>
          <label className='label email'>
            Email
            <input
              type="text"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className='label'>
            Password
            <div className="password-input-container">
              <input
                type={passwordVisible ? "text" : "password"}
                maxLength="12"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="password-input"
              />
              <img
                src={eyeIcon}
                alt="Toggle password visibility"
                className="toggle-password-visibility"
                onClick={() => setPasswordVisible(!passwordVisible)}
              />
            </div>
          </label>

          <div className="button-container">
            <button id="submit-button" type="submit">Log in</button>
            <button id="google-login-button" onClick={handleGoogleLogin}>
              <img src={googleLogo} alt="Google Logo" className="google-logo" />
              Google Login
            </button>
            <button id="forgot-password-button" onClick={handleForgotPassword}>Forgot Password?</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;