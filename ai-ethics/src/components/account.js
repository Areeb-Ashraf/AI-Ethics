import React from 'react'
import "../styles/account.css"

const Account = () => {
  return (
    <>
      <div className="account-container">
        <div className="text-container">
            <div className="text-title">Master AI with ethical integrity</div>
            <div className="text-description">Step into the future of technology by learning how to build AI systems that are fair, transparent, and accountable. Join us and become a leader in responsible AI development.</div>
        </div>
        <div className="input-container">
            <div className="form-header">Sign up</div>
            <div className="form-sub-text">Have an account? <a href="#">Log in</a> </div>
            <form className="form-container">
                <label className='label'>
                    First name
                    <input type="text" required minlength="1" maxlength="18" name="fname" />
                </label>
                <label className='label'>
                    Last name
                    <input type="text" required minlength="1" maxlength="18" name="lname" />
                </label>
                <label className='label email'>
                    Email
                    <input type="text" required name="email" />
                </label>
                <label className='label'>
                    Password
                    <input type="password" maxlength="12" required name="name" />
                </label>
                <label type="password" className='label'>
                    Confirm Password
                    <input type="password" maxlength="12" required name="name" />
                </label>
                <button id="submit-button" type="submit">Create Account</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Account
