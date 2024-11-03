import React from 'react'
import "../styles/welcome.css"
import { useNavigate, Link } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate('/signup');
  };


  return (
    <>
      <div className="welcome-container">
        <div className="welcome-logo">C</div>{/* placeholder for logo */}
        <div className="welcome-title">Welcome to AI Ethics</div>
        <div className="welcome-subtitle">We teach the future of AI, responsibly!</div>
        <button className="create-account-button" onClick={goToSignup}>
          <span>Create Account</span>
        </button>
        <div className="login-text">
          Already have an account?&nbsp;
          <Link to="/login" className="login-link">Log in</Link>
        </div>
      </div>
    </>
  )
}

export default Welcome;