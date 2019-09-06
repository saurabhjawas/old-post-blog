import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { logoutOfProfile, loginWithGoogle } from '../actions/auth'
// LoginPage
const Header = ({ isAuthenticated, logoutOfProfile, loginWithGoogle }) => (
  <header className="header">
    <div className="container">

      <div className="header-text">Old Post</div>

      <div className="nav-container">

        <NavLink
          className="navlink"
          to="/dashboard"
          activeClassName="active-navlink"
        >
          Dashboard
        </NavLink>

        {isAuthenticated && (<NavLink
          className="navlink"
          to="/profile"
          activeClassName="active-navlink"
        >
            Profile
        </NavLink>)}

        {isAuthenticated && (<NavLink
          className="navlink"
          to="/newpost"
          activeClassName="active-navlink"
        >
          New Post
        </NavLink>)}

        <NavLink
          className="navlink"
          to="/contactus"
          activeClassName="active-navlink"
        >
          Contact Us
          </NavLink>

          {isAuthenticated && (<NavLink
          className="navlink"
          to="/mywork"
          activeClassName="active-navlink"
        >
          My Work
        </NavLink>)}

        {isAuthenticated ? (<button
          className="button button-logout"
          onClick={logoutOfProfile}
        >
          Sign out
        </button>) : (<NavLink
          className="navlink"
          to="/login"
          activeClassName="active-navlink"
        >
          Login
        </NavLink>)}

      </div>

    </div>
  </header>
)


const mapDispathToProps = (dispatch) => ({
  logoutOfProfile: () => {
    dispatch(logoutOfProfile())
  },
  loginWithGoogle: () => {
    dispatch(loginWithGoogle())
  }
})

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.userData
})

export default connect(mapStateToProps, mapDispathToProps)(Header)
