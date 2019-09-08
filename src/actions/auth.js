import * as actionTypes from './actionTypes'

// import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = ({ uid, displayName, photoURL, email, emailVerified }) => ({
    type: actionTypes.LOGIN,
    uid,
    displayName,
    photoURL,
    email,
    emailVerified
})

export const logout = () => ({
  type: actionTypes.LOGOUT
})

export const loginWithGoogle = () => ({
  type: actionTypes.LOGIN_WITH_GOOGLE
})

export const logoutOfProfile = () => ({
  type: actionTypes.LOGOUT_OF_PROFILE
})

export const loginWithEmail = (email, password) => ({
  type: actionTypes.LOGIN_WITH_EMAIL,
  email,
  password
})

export const signUpWithEmail = (email, password) => ({
  type: actionTypes.SIGNUP_WITH_EMAIL,
  email,
  password
})

export const resetPassword = (email) => ({
  type: actionTypes.RESET_PASSWORD,
  email
})

export const verifyEmail = () => ({
  type: actionTypes.VERIFY_EMAIL
})