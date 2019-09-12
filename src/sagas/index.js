import {  all } from 'redux-saga/effects'

import * as authSagas from './auth'
import * as userSagas from './user'
import * as postSagas from './post'

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
    userSagas.watchLogin(),

    // post sagas
    postSagas.watchSaveDraft(),
    postSagas.watchStartSetUserPosts()
  ])
}

export default rootSaga