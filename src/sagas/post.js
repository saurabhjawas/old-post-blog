import * as actionTypes from '../actions/actionTypes'
import * as dbApi from '../firebase/databaseApi'

import { takeLatest, put } from 'redux-saga/effects'

// import { database } from '../firebase/firebase'

import { history } from '../routers/AppRouter'

import { setUserPosts, addPost, addDraft, setCommonPosts } from '../actions/post'

// ******************************
// **** saga helpers
// ******************************
function* saveDraftAsync({ draft, uid, postId }) {

  const resultRef = yield dbApi.saveDataAsync({ draft, uid }, dbApi.POSTS, postId)

  if (resultRef.key) {
    
    yield put(addDraft(draft, resultRef.key, uid))

    history.push({
      pathname: '/notification',
      state: {
        displayMessage: 'Draft Saved successfully!'
      }
    })
  } else {
    history.push({
      pathname: './notification',
      state: {
        displayMessage: `${resultRef.code}: ${resultRef.message}`
      }
    })
  }
}

function* fetchUserPostsAsync({ uid }) {

  const snapshot = yield dbApi.fetchDataSnapshotAsync(dbApi.POSTS, 20 , uid)
  
  const posts = []
  if (snapshot.val()) {
    const resultSet = snapshot.val()    
    for (const key in resultSet) {
      const post = resultSet[key]
      post.postId = key
      posts.push(post)
    }   
  }
  yield put(setUserPosts(posts))  
}


function* publishAsync({ uid, post, postId }) {
  
  const resultRef = yield dbApi.saveDataAsync({ post, uid, draft: null }, dbApi.POSTS, postId)

  if (resultRef.key) {

    yield put(addPost(post, resultRef.key, uid))

    history.push({
      pathname: '/notification',
      state: {
        displayMessage: 'Post Published successfully!'
      }
    })
  } else {
    history.push({
      pathname: './notification',
      state: {
        displayMessage: `${resultRef.code}: ${resultRef.message}`
      }
    })
  }
}

function* startSetCommonPostsAsync() {
  const snapshot = yield dbApi.fetchDataSnapshotAsync(dbApi.POSTS, 20)

  const commonPosts = []

  if (snapshot.val()) {
    const resultSet = snapshot.val()
    for (const key in resultSet) {
      const postObj = resultSet[key]

      if (postObj.post) {
        
        commonPosts.push({
          uid: postObj.uid,
          postId: key,
          post: postObj.post
        })
      }

    }
  }

  yield put(setCommonPosts(commonPosts))
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

function* watchStartSetCommonPosts() {
  yield takeLatest(actionTypes.START_SET_COMMON_POSTS, startSetCommonPostsAsync)
}

export { watchSaveDraft , watchStartSetUserPosts, watchPublish, watchStartSetCommonPosts }