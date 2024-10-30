import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authManager } from './firebase'; // Adjust the path as needed
import "./styles/account.css";
import eyeIcon from './eye.png'; // Adjust the path as needed

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      const isRegistered = await authManager.isUserRegistered(email);
      if (isRegistered) {
        throw new Error("Email is already in use. Please log in.");
      }
      const name = `${fname} ${lname}`;
      await authManager.registerWithEmailAndPassword(name, email, password);
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err.message);
      alert(err.message);
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
          Step into the future of technology by learning how to build AI systems that are fair, transparent, and accountable.
          Join us and become a leader in responsible AI development.
        </div>
      </div>
      <div className="input-container">
        <div className="form-header">Sign up</div>
        <div className="form-sub-text">
          Have an account? <Link to="/login">Log in</Link>
        </div>
        <form className="form-container" onSubmit={handleRegister}>
          {/* First Name and Last Name */}
          <label className="label">
            First name
            <input type="text" required minLength="1" maxLength="18" name="fname" value={fname} onChange={(e) => setFname(e.target.value)} />
          </label>
          <label className="label">
            Last name
            <input type="text" required minLength="1" maxLength="18" name="lname" value={lname} onChange={(e) => setLname(e.target.value)} />
          </label>

          {/* Email */}
          <label className="label email">
            Email
            <input type="text" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          {/* Password with Toggle */}
          <label className="label">
            Password
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
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
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </label>

          {/* Confirm Password with Toggle */}
          <label className="label">
            Confirm Password
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                maxLength="12"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="password-input"
              />
              <img
                src={eyeIcon}
                alt="Toggle confirm password visibility"
                className="toggle-password-visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
          </label>

          {/* Submit Button */}
          <button id="submit-button" type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;