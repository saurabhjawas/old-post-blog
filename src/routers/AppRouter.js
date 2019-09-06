import React from 'react'
import { Router,  Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import LoginPage from '../components/LoginPage'
import DashboardPage from '../components/DashboardPage'
import ContactUsPage from '../components/ContactUsPage'
import ProfilePage from '../components/ProfilePage'
import NewPostPage from '../components/NewPostPage'
import MyWorkPage from '../components/MyWorkPage'
import NotFoundPage from '../components/NotFoundPage'
import EmailAuthPage from '../components/EmailAuthPage'
import CustomMessage from '../components/CustomMessage'
import PasswordResetPage from '../components/PasswordResetPage'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={history} >
   <div>
    <Switch>
      <PublicRoute path="/" isRestricted={false} component={DashboardPage} exact={true} />
      <PublicRoute path="/login" isRestricted={true} component={LoginPage} />
      <PublicRoute path="/loginemail" isRestricted={true} component={EmailAuthPage} />
      <PublicRoute path="/dashboard" isRestricted={false} component={DashboardPage} />
      <PublicRoute path="/contactus" isRestricted={false} component={ContactUsPage} />
      <PublicRoute path="/resetpassword" isRestricted={false} component={PasswordResetPage} />
      
      <PrivateRoute path="/profile" component={ProfilePage} />
      <PrivateRoute path="/mywork" component={MyWorkPage} />
      <PrivateRoute path="/newPost" component={NewPostPage} />
      <PublicRoute path="/notification" component={CustomMessage} />

      <PublicRoute isRestricted={false} component={NotFoundPage} />

    </Switch>
    </div>
  </Router>
)

export { history, AppRouter as default }