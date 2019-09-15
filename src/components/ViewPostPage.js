import React from 'react'
import { connect } from 'react-redux'

import { EditorState , convertFromRaw } from 'draft-js'
import  { createEditorStateWithText } from 'draft-js-plugins-editor';

import { getWorkObject } from '../selectors/post'
import moment from 'moment'

import PostEditor from './PostEditor'

const ViewPostPage = ({ postObj }) => {

  //console.log(postObj)
  const postTitle =  postObj ? postObj.post.title : ''

  const initialEditorState = postObj ? (
    EditorState.createWithContent(convertFromRaw(JSON.parse(postObj.post.body)))
  ) : (
    createEditorStateWithText('')
  )

  return (
    <div className="container postWrapper">
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
    postObj: getWorkObject(state.commonPosts, props.match.params.postId)
})

export default connect(mapStateToProps, undefined)(ViewPostPage)