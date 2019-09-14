import * as actionTypes from '../actions/actionTypes'

const commonPostsReducer = (state = [], action) => {
  
  switch (action.type) {
    case actionTypes.SET_COMMON_POSTS:
      return action.posts      
  
    default:
      return state;
  }
}

export default commonPostsReducer