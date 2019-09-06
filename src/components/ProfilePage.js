import React from 'react'
import { connect } from 'react-redux'


const ProfilePage = ({ displayName, photoURL, email }) => {
  return (
    <div className="container">
      <h2>{displayName}</h2>
      <h3>email: {email}</h3>
      <img src={photoURL} alt={displayName} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  displayName: state.auth.userData.displayName,
  photoURL:state.auth.userData.photoURL,
  email: state.auth.userData.email
})

export default connect(mapStateToProps, undefined)(ProfilePage)