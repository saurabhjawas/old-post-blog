import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const LatestPostsPage = ({ commonPosts }) => {
  return (
    <div className="container">
      <h2>This is LatestPostsPage</h2>
      {
        commonPosts.length !== 0 ? (
          commonPosts.map((postObj) => {
            return (
              <Link key={postObj.postId}
                to={`/view/${postObj.postId}`}
              >
                <h3>{postObj.post.title}</h3>
              </Link>
              )
          })
        ) : (
          <h3>Loading the posts...</h3>
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  commonPosts: state.commonPosts
})

export default connect(mapStateToProps, undefined)(LatestPostsPage)

