import * as actionTypes from '../actions/actionTypes'
import * as dbColl from '../firebase/dbCollections'

import { database } from '../firebase/firebase'

import { takeLatest } from 'redux-saga/effects'

// ******************************
// **** saga helpers
// ******************************

function* saveUserAsync({ uid, displayName, photoURL, email, emailVerified }) {

  yield database.ref(`${dbColl.USERS}/${uid}`).update({
    displayName,
    photoURL,
    email,
    emailVerified
  })
}

// ******************************
// **** sagas
// ******************************

function* watchLogin() {
  yield takeLatest(actionTypes.LOGIN, saveUserAsync)
}

export { watchLogin }