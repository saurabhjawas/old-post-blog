import React from 'react'
import { connect } from 'react-redux'

import { EditorState , convertFromRaw } from 'draft-js'
import  { createEditorStateWithText } from 'draft-js-plugins-editor';

import { gerPostObj } from '../selectors/post'
import moment from 'moment'

import PostEditor from './PostEditor'

const ViewPostPage = ({ postObj }) => {
  
  const firstPublishOn = postObj ? moment(postObj.post.createdAt).format('MMMM Do YYYY, h:mm:ss a') : ''
  const lastUpdatedOn = postObj ? moment(postObj.lastUpdatedAt).format('MMMM Do YYYY, h:mm:ss a') : ''

  //console.log(postObj)
  const postTitle =  postObj ? postObj.post.title : ''

  const initialEditorState = postObj ? (
    EditorState.createWithContent(convertFromRaw(JSON.parse(postObj.post.body)))
  ) : (
    createEditorStateWithText('')
  )

  
  return (
    <div className="container postWrapper">

      <h5>First published: {firstPublishOn}</h5>
      <h5>Last update: {lastUpdatedOn}</h5>
      <div className="postTitleView">{postTitle}</div>

      <PostEditor
        postEditorState={initialEditorState}
        setPostEditorState={() => { }}
        readOnly={true}
      />
    </div>
  )
}

const mapStateToProps = (state, props) => ({  
    postObj: gerPostObj(state.commonPosts, props.match.params.postId)
})

export default connect(mapStateToProps, undefined)(ViewPostPage)