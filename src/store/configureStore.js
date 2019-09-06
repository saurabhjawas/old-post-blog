import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

// reducers
import authReducer from '../reducers/auth'

// saga
import rootSaga from '../sagas'

const configureStore = () => {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    combineReducers({
      auth: authReducer
    }) ,composeEnhancers(applyMiddleware(sagaMiddleware))
  )
  
  sagaMiddleware.run(rootSaga)

  return store
} 





export default configureStore