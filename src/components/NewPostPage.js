import React, { useState } from 'react'
import { connect } from 'react-redux'

import { convertToRaw } from 'draft-js'
import  { createEditorStateWithText } from 'draft-js-plugins-editor';

import { saveDraft } from '../actions/post'

import PostEditor from './PostEditor'

const NewPostPage = (props) => {
  
  const [ postTitle, setPostTitle] = useState('')

  const [postEditorState, setPostEditorState ] = useState(createEditorStateWithText(''))

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value) 
  }

  const handleSaveDraft = (e) => {
    const contentState = postEditorState.getCurrentContent()
    const draftContent = convertToRaw(contentState)
    const draft = {
      title: postTitle,
      body: draftContent
    }
    props.saveDraft(draft)
  }

  return (
    <div className="container postWraper">

    <div className="postButtonWrapper">
    <button className="postButton"
      onClick={handleSaveDraft}
    >
      Save draft
    </button>

    <button className="postButton">
      Publish
    </button>
  </div>

    <input className="postTitleInput" 
      type="text"
      value={postTitle}
      onChange={handlePostTitleChange}
      placeholder="post title here.."
    />

      {/* <h2>This is NewPostPage</h2> */}
      <PostEditor
        postEditorState={postEditorState}
        setPostEditorState={setPostEditorState}
      />
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  saveDraft: (draft) => {
    dispatch(saveDraft(draft))
  }
})

export default connect(undefined, mapDispatchToProps)(NewPostPage)