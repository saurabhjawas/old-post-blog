import {  all } from 'redux-saga/effects'

import * as authSagas from './auth'
import * as dbSagas from './database'

function* rootSaga() {
  yield all([
    // auth sagas
    authSagas.watchLoginWithGoogle(),
    authSagas.watchLogoutOfProfile(),
    authSagas.watchLoginWithEmail(),
    authSagas.watchSignUpwithEmail(),
    authSagas.watchResetPassword(),
    authSagas.watchVerifyEmail(),

    //databse sagas
    dbSagas.watchLogin(),
  ])
}

export default rootSaga