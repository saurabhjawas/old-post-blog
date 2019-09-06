import {  all } from 'redux-saga/effects'

import * as authSagas from './auth'

function* rootSaga() {
  yield all([
    authSagas.watchLoginWithGoogle(),
    authSagas.watchLogoutOfProfile(),
    authSagas.watchLoginWithEmail(),
    authSagas.watchSignUpwithEmail(),
    authSagas.watchResetPassword()
  ])
}

export default rootSaga