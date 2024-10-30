import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import "../styles/account.css"
import Signup from './signup'
import Login from './login'

const Account = () => {
  const location = useLocation();
  const [isSignup, setIsSignup] = useState(true);

  // Set the component to show based on navigation from Welcome.js
  useEffect(() => {
    if (location.state) {
      setIsSignup(location.state.isSignup);
    }
  }, [location.state]);

  const toggleForm = () => {
    setIsSignup(!isSignup); // Toggle between Signup and Login
  };

  return (
    <div className="account-container">
      <div className="text-container">
        <div className="text-title">Master AI with ethical integrity</div>
        <div className="text-description">
          Step into the future of technology by learning how to build AI systems that are fair, transparent, and accountable. Join us and become a leader in responsible AI development.
        </div>
      </div>
      <div className="input-container">
        {isSignup ? (
          <Signup toggleForm={toggleForm} />
        ) : (
          <Login toggleForm={toggleForm} />
        )}
      </div>
    </div>
  )
}

export default Account;
