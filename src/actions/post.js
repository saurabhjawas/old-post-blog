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

export const publish = (uid, post, postId) => ({
  type: actionTypes.PUBLISH,
  uid,
  post,
  postId
})

export const addPost = (post, postId, uid) => ({
  type: actionTypes.ADD_POST,
  post,
  postId,
  uid
})

export const addDraft = (draft, postId, uid) => ({
  type: actionTypes.ADD_DRAFT,
  draft,
  postId,
  uid
})

export const setCommonPosts = (posts) => ({
  type: actionTypes.SET_COMMON_POSTS,
  posts
})


export const startSetCommonPosts = () => ({
  type: actionTypes.START_SET_COMMON_POSTS
})