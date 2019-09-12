import * as actionTypes from './actionTypes'

export const saveDraft = (uid, draft, postId) => ({
  type: actionTypes.SAVE_DRAFT,  
  uid,
  draft,
  postId
})

export const startSetUserPosts = (uid) => ({
  type: actionTypes.START_SET_USER_POSTS,
  uid
})

export const setUserPosts = (posts) => ({
  type: actionTypes.SET_USER_POSTS,
  posts
})