const authReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN':
        return {
          firebaseUid: action.firebaseUid,
          userData: action.userData
        }
    case 'LOGOUT':
          return {}
    default:
      return state
  }
}

export default authReducer