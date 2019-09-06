import React from 'react'
import { connect } from 'react-redux'

import PostEditor from './PostEditor'

const NewPostPage = (props) => (
  <div className="container postWraper">
    {/* <h2>This is NewPostPage</h2> */}
    <PostEditor />
  </div>
)

export default connect(undefined, undefined)(NewPostPage)