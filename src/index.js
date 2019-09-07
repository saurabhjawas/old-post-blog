import React from 'react';
import ReactDOM from 'react-dom';

// redux Store
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

//firebase
import { firebase } from './firebase/firebase'
import { login, logout, verifyEmail } from './actions/auth'

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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {

    // console.log(user)
    if (user.emailVerified) {

      // console.log('email is VERIFIED!!!')
      store.dispatch(login(user))
      // history.push('/dashboard')

    } else {
      console.log('email is NOT VERIFIED!!!')
      store.dispatch(verifyEmail(user))
    }   
    
  } else {
    store.dispatch(logout())
    // history.push('/login')
  }
  renderApp()
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
