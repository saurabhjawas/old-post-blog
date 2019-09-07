const authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
        return {
          uid: action.uid,
          displayName: action.displayName,
          photoURL: action.photoURL,
          email: action.email,
          emailVerified: action.emailVerified
        }
    case 'LOGOUT':
          return {}
    default:
      return state
  }
}

export default authReducer
