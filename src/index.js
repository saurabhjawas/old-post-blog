import React from 'react';
import ReactDOM from 'react-dom';

// redux Store
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

//firebase
import { firebase } from './firebase/firebase'

//actions
import { login, logout, verifyEmail } from './actions/auth'
import { startSetUserPosts, setUserPosts, startSetCommonPosts } from './actions/post'

// STYLES
import 'normalize.css/normalize.css';
import './styles/styles.scss'

// approuter
import AppRouter from './routers/AppRouter'

//components
import LoadingPage from './components/LoadingPage'

// DO NOT TOUCH THE CODE BELOW
import * as serviceWorker from './serviceWorker';
// DO NOT TOUCH THE CODE ABOVE

ReactDOM.render(<LoadingPage />, document.getElementById('root'));

const store = configureStore()

const jsx = (
  <Provider store={store} >
    <AppRouter />
  </Provider>
)

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true
  }
}

store.dispatch(startSetCommonPosts())

firebase.auth().onAuthStateChanged((user) => {
  if (user) {

    if (user.emailVerified) {

      store.dispatch(login(user))
      store.dispatch(startSetUserPosts(user.uid))

    } else {
      // console.log('email is NOT VERIFIED!!!')
      store.dispatch(verifyEmail(user))
    }   
    
  } else {
    store.dispatch(setUserPosts([]))
    store.dispatch(logout())
    
  }
  renderApp()
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
