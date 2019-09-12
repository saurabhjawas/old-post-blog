import * as actionTypes from '../actions/actionTypes'

const postReducer = (state = [], action) => {
  switch(action.type) {
    case actionTypes.SET_USER_POSTS:
        console.log(`Called reducer`)
        return action.posts

    default:
      return state
  }
}

export default postReducer
