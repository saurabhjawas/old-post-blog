import React, { useState } from 'react'
import { connect } from 'react-redux'

import { EditorState, convertToRaw , convertFromRaw } from 'draft-js'
import  { createEditorStateWithText } from 'draft-js-plugins-editor';

import moment from 'moment'

import { saveDraft } from '../actions/post'

import PostEditor from './PostEditor'

const EditPostPage = (props) => {

  const postId = props.draftData ? props.draftData.postId : undefined

  const initialTitle =  props.draftData ? props.draftData.title : ''

  const initialEditorState = props.draftData ? (
    EditorState.createWithContent(convertFromRaw(props.draftData))
  ) : (
    createEditorStateWithText('')
  )
  
  const [ postTitle, setPostTitle] = useState(initialTitle)

  const [postEditorState, setPostEditorState ] = useState(initialEditorState)

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value) 
  }

  const handleSaveDraft = (e) => {
    const contentState = postEditorState.getCurrentContent()

    const rawContent = convertToRaw(contentState)
    const draft = {
      title: postTitle,
      body: rawContent,
      savedAt: moment().valueOf()
    }
    

    props.saveDraft(props.uid, draft, postId)
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

const mapStateToProps = (state) => ({
  uid:  state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
  saveDraft: (uid, draft, postId) => {
    dispatch(saveDraft(uid, draft, postId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage)