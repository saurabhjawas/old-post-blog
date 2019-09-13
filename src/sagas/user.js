import * as actionTypes from '../actions/actionTypes'
import * as dbApi from '../firebase/databaseApi'

import { takeLatest } from 'redux-saga/effects'

// ******************************
// **** saga helpers
// ******************************

function* saveUserAsync({ uid, displayName, photoURL, email, emailVerified }) {

  yield dbApi.saveDataAsync({ displayName, photoURL, email, emailVerified }, dbApi.USERS, uid)

}


// ******************************
// **** sagas
// ******************************

function* watchLogin() {
  yield takeLatest(actionTypes.LOGIN, saveUserAsync)
}

export { watchLogin }