import React from 'react'
import { Router,  Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import LoginPage from '../components/LoginPage'
import LatestPostsPage from '../components/LatestPostsPage'
import ContactUsPage from '../components/ContactUsPage'
import ProfilePage from '../components/ProfilePage'
import EditPostPage from '../components/EditPostPage'
import MyWorkPage from '../components/MyWorkPage'
import NotFoundPage from '../components/NotFoundPage'
import EmailAuthPage from '../components/EmailAuthPage'
import CustomMessage from '../components/CustomMessage'
import PasswordResetPage from '../components/PasswordResetPage'
import ViewPostPage from '../components/ViewPostPage'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const history = createBrowserHistory()

const AppRouter = () => (
  <Router history={history} >
   <div>
    <Switch>
      <PublicRoute path="/" isRestricted={false} component={LatestPostsPage} exact={true} />
      <PublicRoute path="/login" isRestricted={true} component={LoginPage} />
      <PublicRoute path="/loginemail" isRestricted={true} component={EmailAuthPage} />
      <PublicRoute path="/latestposts" isRestricted={false} component={LatestPostsPage} />
      <PublicRoute path="/contactus" isRestricted={false} component={ContactUsPage} />
      <PublicRoute path="/resetpassword" isRestricted={false} component={PasswordResetPage} />      
      <PublicRoute path="/view/:postId" isRestricted={false} component={ViewPostPage} />
      <PublicRoute path="/notification" isRestricted={false}  component={CustomMessage} />

      <PrivateRoute path="/profile" component={ProfilePage} />
      <PrivateRoute path="/mywork" component={MyWorkPage} />
      <PrivateRoute path="/newPost" component={EditPostPage} />

      <PublicRoute isRestricted={false} component={NotFoundPage} />

    </Switch>
    </div>
  </Router>
)

export { history, AppRouter as default }