import React from 'react'

const Signup = ({ toggleForm }) => {
  return (
    <>
      <div className="form-header">Sign up</div>
      <div className="form-sub-text">
        Have an account? 
        <a href="#" onClick={toggleForm}>Log in</a>
      </div>
      <form className="form-container">
        <label className='label'>
          First name
          <input type="text" required minLength="1" maxLength="18" name="fname" />
        </label>
        <label className='label'>
          Last name
          <input type="text" required minLength="1" maxLength="18" name="lname" />
        </label>
        <label className='label email'>
          Email
          <input type="text" required name="email" />
        </label>
        <label className='label'>
          Password
          <input type="password" maxLength="12" required name="password" />
        </label>
        <label className='label'>
          Confirm Password
          <input type="password" maxLength="12" required name="confirmPassword" />
        </label>
        <button id="submit-button" type="submit">Create Account</button>
      </form>
    </>
  )
}

export default Signup;
