import * as actionTypes from '../actions/actionTypes'
import * as dbColl from '../firebase/dbCollections'

import { takeLatest, put, call } from 'redux-saga/effects'

import { database } from '../firebase/firebase'

import { history } from '../routers/AppRouter'

import { setUserPosts } from '../actions/post'

// ******************************
// **** saga helpers
// ******************************
function* saveDraftAsync({ draft, uid, postId }) {
  
  if (postId) {
    yield database.ref(`${dbColl.POSTS}/${postId}`).update({
      uid,
      draft
    }).then(() => {
      history.push({
        pathname: '/notification',
        state: {
          displayMessage: 'Draft Saved successfully!'
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

  } else {
    yield database.ref(dbColl.POSTS).push({
      uid: uid,
      draft: draft
    }).then(() => {
      history.push({
        pathname: '/notification',
        state: {
          displayMessage: 'Draft Saved successfully!'
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
}

function* fetchUserPostsAsync({ uid }) {

  const fetchPostsSnapshot = (uid) => {
    return new Promise((resolve, reject) => {
      database.ref(dbColl.POSTS)
        .orderByChild(dbColl.UID)
        .equalTo(uid)
        .once('value', resolve)
    })
  }

  const snapshot = yield call(fetchPostsSnapshot, uid)

  const posts = []
  if (snapshot.val()) {
    const resultSet = snapshot.val()    
    for (const key in resultSet) {
      posts.push(resultSet[key])
    }   
  }
  yield put(setUserPosts(posts))  
}

function* publishAsync({ uid, post, postId }) {
  
  if (postId) {

    yield database.ref(`${dbColl.POSTS}/${postId}`).update({
      uid,
      post
    }).then(() => {
      history.push({
        pathname: '/notification',
        state: {
          displayMessage: 'Post Published successfully!'
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

  } else {

    yield database.ref(dbColl.POSTS).push({
      uid,
      post
    }).then(() => {
      history.push({
        pathname: '/notification',
        state: {
          displayMessage: 'Post Published successfully!'
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
}

// ******************************
// **** sagas
// ******************************
function* watchSaveDraft() {
  yield takeLatest(actionTypes.SAVE_DRAFT, saveDraftAsync)
}

function* watchStartSetUserPosts() {
  yield takeLatest(actionTypes.START_SET_USER_POSTS, fetchUserPostsAsync)
}

function* watchPublish() {
  yield takeLatest(actionTypes.PUBLISH, publishAsync)
}


export { watchSaveDraft , watchStartSetUserPosts, watchPublish }