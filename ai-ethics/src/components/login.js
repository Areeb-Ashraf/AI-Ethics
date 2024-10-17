import React from 'react'

const Login = ({ toggleForm }) => {
  return (
    <>
      <div className="form-header">Log in</div>
      <div className="form-sub-text">
        Need an account? 
        <a href="#" onClick={toggleForm}>Sign up</a>
      </div>
      <form className="form-container column">
        <label className='label email'>
          Email
          <input type="text" required name="email" />
        </label>
        <label className='label'>
          Password
          <input type="password" maxLength="12" required name="password" />
        </label>
        <button id="submit-button" type="submit">Log in</button>
      </form>
    </>
  )
}

export default Login;
