import React from 'react'
import { connect} from 'react-redux'
import { loginWithGoogle } from '../actions/auth'

import { history } from '../routers/AppRouter'
// import EmailAuthForm from '../components/EmailAuthForm'

const LoginPage = ({ loginWithGoogle }) => {
  return (
    <div className="container">
      <div className="loginBox">
        <h1>Welcome to <span className="header-text">Old Post</span></h1>
        <div className="loginOptionWraper">
          <span className="loginOption" onClick={loginWithGoogle}>Login with Google</span>
          <span className="loginOption"
           onClick={(e) => {
            history.push({
              pathname: '/loginemail'
            }) 
          }}
          >Login with Email</span>
        </div>
        
      {/* <EmailAuthForm isForSignUp={false} /> */}
        
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  loginWithGoogle: () => {
    dispatch(loginWithGoogle())
  }
})

export default connect(undefined, mapDispatchToProps)(LoginPage)