import * as actionTypes from '../actions/actionTypes'
import * as dbColl from '../firebase/dbCollections'

import { takeLatest } from 'redux-saga/effects'

import { database } from '../firebase/firebase'

import { history } from '../routers/AppRouter'

// ******************************
// **** saga helpers
// ******************************
function* saveDraftAsync(action) {
  if (action.postId) {
    yield database.ref(`${dbColl.POSTS}/${action.postId}`).update({
      draft: action.draft
    }).then(() => {
      history.push({
        pathname: '/notification',
        state: {
          displayMessage: 'Draft Saved successfully!'
        }
      })
    })

  } else {
    yield database.ref(dbColl.POSTS).push({
      draft: action.draft
    }).then(() => {
      history.push({
        pathname: '/notification',
        state: {
          displayMessage: 'Draft Saved successfully!'
        }
      })
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