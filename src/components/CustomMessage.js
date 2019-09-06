import React from 'react'
import NotFoundPage from './NotFoundPage'

const CustomMessage = ({ location }) => {
  if (location.state) {
    return (
      <div className="container">       
        <h3>{ location.state.displayMessage }</h3>
      </div>
    )
  } else {
    return (
      <NotFoundPage />
    )
  }
}
   
export default CustomMessage