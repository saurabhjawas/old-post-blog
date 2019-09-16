import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getDrafts, getPosts } from '../selectors/post'

const MyWorkPage = ({ myDrafts, myPosts }) => (
  <div className="container">
   {
      myDrafts.length !== 0 ? (
        <h2>Here are the saved drafts.. click on one to edit it..</h2>        
      ) : (
        <h2>You do not have any saved drafts! </h2>
      )
    }

    { 
      myDrafts.length !== 0 && (
        myDrafts.map((draftObj) => (
          <div key={draftObj.postId}>
            <Link to={`/edit/${draftObj.postId}`}
            >
              <h3>{draftObj.draft.title}</h3>
            </Link>
          </div>
          )

        )
      )
    }

    {
      myPosts.length !== 0 ? (
        <h2>Here are your posts...click on one to edit it</h2>        
      ) : (
        <h2>You haven't published any post yet!</h2>
      )
    }

    { 
      myPosts.length !== 0 && (
        myPosts.map((postObj) => (
          <div key={postObj.postId}>
            <Link to={`/edit/${postObj.postId}`}
            >
              <h3>{postObj.post.title}</h3>
            </Link>
          </div>
          )

        )
      )
    }
  </div>
)

const mapStateToProps = (state) => ({
  myDrafts: getDrafts(state.userPosts),
  myPosts: getPosts(state.userPosts)
})

export default connect(mapStateToProps, undefined)(MyWorkPage)