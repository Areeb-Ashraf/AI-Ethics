import React from 'react'
import "../styles/welcome.css"
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate('/account', { state: { isSignup: true } });
  };

  const goToLogin = () => {
    navigate('/account', { state: { isSignup: false } });
  };

  return (
    <>
      <div className="welcome-container">
        <div className="welcome-logo">C</div>{/* placeholder for logo */}
        <div className="welcome-title">Welcome to EthicAI</div>
        <div className="welcome-subtitle">We teach the future of AI, responsibly</div>
        <button className="create-account-button" onClick={goToSignup}>
          <span>Create Account</span>
        </button>
        <div className="login-text">
          Already Have an account?&nbsp;
          <a className="login-link" href="#" onClick={goToLogin}>Log in</a>
        </div>
      </div>
    </>
  )
}

export default Welcome;
