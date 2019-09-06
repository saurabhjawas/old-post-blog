import React, { useState } from 'react'
import { connect } from 'react-redux'

import { signUpWithEmail, loginWithEmail } from '../actions/auth'

import { history } from '../routers/AppRouter'

//<div className="loginFormWrapper">
const EmailAuthPage = ({ signUpWithEmail, loginWithEmail}) => {

  const [isForSignUp, setIsForSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const changeAuthFormType = (e) => {
    setIsForSignUp(!isForSignUp)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const signUpUserEmail = (e) => {
    e.preventDefault()
    signUpWithEmail(email, password)
  }

  const loginUserEmail = (e) => {
    e.preventDefault()
    loginWithEmail(email, password)
  }

  const handleResetPassword = (e) => {
    history.push({
      pathname: '/resetpassword'
    })
  }

  return (
    <div className="container emailAuthWrapper">
      <h3>Please enter details and click {isForSignUp ? 'Sign Up' : 'Login'} button</h3>
      <h5 className="changeFormOption"
        onClick={changeAuthFormType}
      >
        {
          isForSignUp ? 
            'Already Registered? Click here to login' 
            : 'New user? Click here to Sign Up'
        }
      </h5>
      <div className="loginform">
        <form
          onSubmit={isForSignUp ? signUpUserEmail : loginUserEmail}
        >
          <input type="email"
            value={email}
            placeholder="email"
            onChange={handleEmailChange}
          />
          <input type="password" 
            value={password}
            placeholder="password"
            onChange={handlePasswordChange}
          />
          
        <button className="button">
          {isForSignUp ? 'Sign Up' : 'Login'}
        </button>
        </form>
        
        {
          !isForSignUp && (
            <h4 className="changeFormOption"
              onClick={handleResetPassword}
            >
              Forgot password? Click here to reset it
            </h4>
          )
        }
        

      </div>


    </div>
  )  
}

const mapDispatchToProps = (dispatch) => ({
  signUpWithEmail: (email, password) => {
    dispatch(signUpWithEmail(email, password))
  },
  loginWithEmail: (email, password) => {
    dispatch(loginWithEmail(email, password))
  }
})

export default connect(undefined, mapDispatchToProps)(EmailAuthPage)