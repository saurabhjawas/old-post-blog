import * as actionTypes from '../actions/actionTypes'
import * as dbColl from '../firebase/dbCollections'

import { takeLatest } from 'redux-saga/effects'

import { database } from '../firebase/firebase'

// ******************************
// **** saga helpers
// ******************************
function* saveDraftAsync(action) {
  if (action.postId) {
    yield database.ref(`${dbColl.POSTS}/${action.postId}`).update({
      draft: action.draft
    })
  } else {
    yield database.ref(dbColl.POSTS).push({
      draft: action.draft
    })
  }
}


// ******************************
// **** sagas
// ******************************
function* watchSaveDraft() {
  yield takeLatest(actionTypes.SAVE_DRAFT, saveDraftAsync)
}

export { watchSaveDraft }