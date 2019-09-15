import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { logoutOfProfile } from '../actions/auth'

const Header = ({ isAuthenticated, logoutOfProfile }) => (
  <header className="header">
    <div className="container">

      <div className="header-text">Old Post</div>

      <div className="nav-container">

        <NavLink
          className="navlink"
          to="/latestposts"
          activeClassName="active-navlink"
        >
          Recent
        </NavLink>

        {
          isAuthenticated && (<NavLink
            className="navlink"
            to="/profile"
            activeClassName="active-navlink"
          >
              Profile
          </NavLink>)
        }

        {
          isAuthenticated && (<NavLink
            className="navlink"
            to="/newpost"
            activeClassName="active-navlink"
          >
            New Post
          </NavLink>)
        }

        <NavLink
          className="navlink"
          to="/contactus"
          activeClassName="active-navlink"
        >
          Contact Us
          </NavLink>

        {
          isAuthenticated && (<NavLink
            className="navlink"
            to="/mywork"
            activeClassName="active-navlink"
          >
            My Work
          </NavLink>)
        }

        {
          isAuthenticated ? (<button
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
          </NavLink>)
        }

      </div>

    </div>
  </header>
)

const mapDispathToProps = (dispatch) => ({
  logoutOfProfile: () => {
    dispatch(logoutOfProfile())
  }
})

export default connect(undefined, mapDispathToProps)(Header)
