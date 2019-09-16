import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { EditorState, convertToRaw , convertFromRaw } from 'draft-js'
import  { createEditorStateWithText } from 'draft-js-plugins-editor';

import moment from 'moment'

import { saveDraft, publish } from '../actions/post'
import { getWorkObject } from '../selectors/post'

import PostEditor from './PostEditor'

const EditPostPage = ({ draftObj, uid, saveDraft, publish }) => {

  const postId = draftObj ? draftObj.postId : undefined

  const initialTitle =  draftObj ? draftObj.draft.title : ''

  const initialEditorState = draftObj ? (
    EditorState.createWithContent(convertFromRaw(JSON.parse(draftObj.draft.body)))
  ) : (
    createEditorStateWithText('')
  )
  
  const [ postTitle, setPostTitle] = useState(initialTitle)
  
  // console.log(`*****${postId}*****`)

  const [postEditorState, setPostEditorState ] = useState(initialEditorState)

  const handlePostTitleChange = (e) => {
    setPostTitle(e.target.value) 
  }

  const handleSaveDraft = (e) => {
    const contentState = postEditorState.getCurrentContent()
    const rawContent = convertToRaw(contentState)
    const draft = {
      title: postTitle,
      body: JSON.stringify(rawContent),
      savedAt: moment().valueOf()
    }
    saveDraft( uid, draft, postId)
  }

  const handlePublish = (e) => {
    const contentState = postEditorState.getCurrentContent()
    const rawContent = convertToRaw(contentState)
    const post = {
      title: postTitle,
      body: JSON.stringify(rawContent),
      createdAt: draftObj ? draftObj.createdAt : moment().valueOf(),
      lastUpdatedAt: moment().valueOf()
    }
    publish(uid, post, postId)
  }

  useEffect(() => {
    setPostEditorState(initialEditorState)
    setPostTitle(initialTitle)
  }, [draftObj])

  return (
    <div className="container postWrapper">

      <div className="postButtonWrapper">
        <button className="postButton"
          onClick={handleSaveDraft}
        >
          Save draft
        </button>

        <button className="postButton"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>

      <input className="postTitleInput" 
        type="text"
        value={postTitle}
        onChange={handlePostTitleChange}
        placeholder="post title here.."
      />

      <PostEditor
        postEditorState={postEditorState}
        setPostEditorState={setPostEditorState}
        readOnly={false}
      />

    </div>
  )
}

const mapStateToProps = (state, props) => ({
  uid: state.auth.uid,
  draftObj: getWorkObject(state.userPosts, props.match.params.postId )
})

const mapDispatchToProps = (dispatch) => ({
  saveDraft: (uid, draft, postId) => {
    dispatch(saveDraft(uid, draft, postId))
  },
  publish: (uid, post, postId) => {
    dispatch(publish(uid, post, postId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage)