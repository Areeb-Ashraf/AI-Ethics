import React from 'react'
import "../styles/welcome.css"

const Welcome = () => {
  return (
    <>
      <div className="welcome-container">
        <div className="welcome-logo">C</div>{/*placeholder for logo*/}
        <div className="welcome-title">Welcome to EthicAI</div>
        <div className="welcome-subtitle">We teach the future of AI, responsibly</div>
        <button className="create-account-button"><span>Create Account</span></button>
      </div>
    </>
  )
}

export default Welcome
