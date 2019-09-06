import React, { useState } from 'react'
import { connect } from 'react-redux'
import { resetPassword } from '../actions/auth'

const PasswordResetPage = ({ resetPassword }) => {

  const [email, setEmail] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordReset = (e) => {    
    e.preventDefault()
    resetPassword(email)
  }

  return (
    <div className="container">
      
      <div className="loginform">
        <form onSubmit={handlePasswordReset}>
          <input type="email"
            value={email}
            placeholder="enter your email id here"
            onChange={handleEmailChange}
          />
          <button className="button">
            Send Password reset link
          </button>
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (email) => {
    dispatch(resetPassword(email))
  }
})

export default connect(undefined, mapDispatchToProps)(PasswordResetPage)