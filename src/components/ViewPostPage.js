import React from 'react'
import { connect } from 'react-redux'

import { EditorState , convertFromRaw } from 'draft-js'
import  { createEditorStateWithText } from 'draft-js-plugins-editor';

import moment from 'moment'

// import { saveDraft, publish } from '../actions/post'

import PostEditor from './PostEditor'

const ViewPostPage = ({ postObj }) => {

  // const postId = draftData ? draftData.postId : undefined
  console.log(postObj)
  const postTitle =  postObj ? postObj.post.title : ''

  const initialEditorState = postObj ? (
    EditorState.createWithContent(convertFromRaw(JSON.parse(postObj.post.body)))
  ) : (
    createEditorStateWithText('')
  )

  // const [postEditorState, setPostEditorState ] = useState(initialEditorState)

  return (
    <div className="container postWraper">

      <input className="postTitleInput" 
        type="text"
        readOnly
        defaultValue={postTitle} 
  
      />

      <PostEditor
        postEditorState={initialEditorState}
        setPostEditorState={() => { }}
        readOnly={true}
      />
      

    </div>
  )
}

const mapStateToProps = (state, props) => {

  const getPostObject = (postId) => {

    console.log(`**postId*****${postId}*******`)
    console.log(state.commonPosts)
    const idx = state.commonPosts.findIndex(postObj => {
      
      return postObj.postId === postId
    })

    console.log(`*******${idx}*******`)

    if (idx >= 0) {
      return state.commonPosts[idx]
    } else {
      return undefined
    }
  }

  return {  
    postObj: getPostObject(props.match.params.postId)
  }
}


export default connect(mapStateToProps, undefined)(ViewPostPage)