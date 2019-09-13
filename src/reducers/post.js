import * as actionTypes from '../actions/actionTypes'

const postReducer = (state = [], action) => {

  let newState = []
  let idx = -1
  switch(action.type) {
    case actionTypes.SET_USER_POSTS:
      return action.posts

    case actionTypes.ADD_POST:
      newState = [...state]
      idx = newState.findIndex((post) => (post.postId === action.postId) )

      if (idx >= 0) {
        newState[idx] = {
          post: action.post,
          postId: action.postId,
          uid: action.uid
        }

      } else {
        newState.push({
          post: action.post,
          postId: action.postId,
          uid: action.uid
        })
      }
    
      return newState
      

    case actionTypes.ADD_DRAFT:
      newState = [...state]
      idx = newState.findIndex((post) => (post.postId === action.postId))

      if (idx >= 0) {
        newState[idx] = {
          ...newState[idx],
          draft: action.draft
        }
      } else {
        newState.push({          
          draft: action.draft,
          postId: action.postId,
          uid: action.uid
        })
      }

      return newState

    default:
      return state
  }
}

export default postReducer
