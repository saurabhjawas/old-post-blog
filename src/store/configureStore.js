import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

// reducers
import authReducer from '../reducers/auth'
import postReducer from '../reducers/post'

// saga
import rootSaga from '../sagas'

const configureStore = () => {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    combineReducers({
      auth: authReducer,
      userPosts: postReducer
    }) , composeEnhancers(applyMiddleware(sagaMiddleware))
  )
  
  sagaMiddleware.run(rootSaga)

  return store
} 





export default configureStore