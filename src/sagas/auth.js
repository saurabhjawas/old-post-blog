import * as actionTypes from '../actions/actionTypes'
import { firebase, googleAuthProvider } from '../firebase/firebase'

import { takeLatest } from 'redux-saga/effects'

import { history } from '../routers/AppRouter'

// ******************************
// **** saga helpers
// ******************************

function* loginWithGoogleAsync() {
  yield firebase.auth().signInWithPopup(googleAuthProvider)
  .catch((error) => {
    history.push({
      pathname: './notification',
      state: {
        displayMessage: `${error.code}: ${error.message}`
      }
    })
  })
}

function* logoutOfProfileAsync() {
  yield firebase.auth().signOut()
    .catch((error) => {
      history.push({
        pathname: '/notification',
        state: {
          displayMessage: `${error.code}: ${error.message}`
        }
      })
    })
}

function* loginWithEmailAsync({ email, password }) {
  yield firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      history.push({
        pathname: './notification',
        state: {
          displayMessage: `${error.code}: ${error.message}`
        }
      })
    })
}

function* signUpwithEmailAsync ({ email, password }) {
  yield firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      history.push({
        pathname: './notification',
        state: {
          displayMessage: 'Success!!! We have created your account.'
        }
      })
    })
    .catch((error) => {
      history.push({
        pathname: './notification',
        state: {
          displayMessage: `${error.code}: ${error.message}`
        }
      })
    })
}

function* resetPasswordAsync({ email }) {
  yield firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      history.push({
        pathname: '/notification',
        state: {
          displayMessage: 'A link to reset password has been sent to your email id. Please check your email.'
        } 
      })
    }).catch((error) => {
      history.push({
        pathname: './notification',
        state: {
          displayMessage: `${error.code}: ${error.message}`
        }
      })
    })
}

function* verifyEmailAsync() {
  yield firebase.auth().currentUser.sendEmailVerification().then(() => {
      console.log('*** verification email sent ****');      
      firebase.auth().signOut()
    }).then(() => {
      history.push({
        pathname: './notification',
        state: {
          displayMessage: 'We just sent you an email for you to check and to verify your email id.'
        }
      })
    }).catch((error) => {
      history.push({
        pathname: './notification',
        state: {
          displayMessage: `${error.code}: ${error.message}`
        }
      })
    })
}

// ******************************
// **** sagas
// ******************************
function* watchLoginWithGoogle() {
  yield takeLatest(actionTypes.LOGIN_WITH_GOOGLE, loginWithGoogleAsync)
}

function* watchLogoutOfProfile() {
  yield takeLatest(actionTypes.LOGOUT_OF_PROFILE,logoutOfProfileAsync)
}

function* watchLoginWithEmail() {
  yield takeLatest(actionTypes.LOGIN_WITH_EMAIL, loginWithEmailAsync)
}

function* watchSignUpwithEmail() {
  yield takeLatest(actionTypes.SIGNUP_WITH_EMAIL, signUpwithEmailAsync)
}

function* watchResetPassword() {
  yield takeLatest(actionTypes.RESET_PASSWORD, resetPasswordAsync)
}

function* watchVerifyEmail() {
  yield takeLatest(actionTypes.VERIFY_EMAIL, verifyEmailAsync)
}

export { 
  watchLoginWithGoogle, watchLogoutOfProfile,
  watchLoginWithEmail, watchSignUpwithEmail,
  watchResetPassword, watchVerifyEmail
}