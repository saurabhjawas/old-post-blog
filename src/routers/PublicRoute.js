import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import Header from '../components/Header'

const PublicRoute = ({
  isAuthenticated,
  isRestricted,
  component: Component,
  ...rest
}) => {

  // preparing the component to be passed to the route
  const ComponentForRoute = (props) => {
    if (isRestricted && isAuthenticated) {

      return (
        <Redirect to="/dashboard" />
      )

    } else {

      return (
        <div>
          <Header isAuthenticated={isAuthenticated} />
          <Component {...props} />
        </div>
      )

    }
  }

  return (
    <Route {...rest} component={ComponentForRoute} />
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps, undefined)(PublicRoute)