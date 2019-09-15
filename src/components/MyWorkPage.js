import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getDrafts } from '../selectors/post'

const MyWorkPage = ({ myDrafts }) => (
  <div className="container">
   {
      myDrafts.length !== 0 ? (
        <h2>Here are the saved drafts...</h2>        
      ) : (
        <h2>You do not have any saved drafts!</h2>
      )
    }

    { myDrafts.length !== 0 && (
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
  </div>
)

const mapStateToProps = (state) => ({
  myDrafts: getDrafts(state.userPosts)
})

export default connect(mapStateToProps, undefined)(MyWorkPage)