export const getWorkObject = (workList, postId) => {

  const idx = workList.findIndex(workObj => workObj.postId === postId )

  if (idx >= 0) {
    const draft = workList[idx].draft ? workList[idx].draft : {
      body: workList[idx].post.body,
      savedAt: workList[idx].post.lastUpdatedAt,
      title: workList[idx].post.title
    }

    return {
      draft,
      uid: workList[idx].uid,
      postId: workList[idx].postId
    }

  } else {
    return null
  }
}

export const getDrafts = (posts) => (
  posts
    .filter(postObj => postObj.draft ? true : false )
    .map(postObj => ({
      draft: postObj.draft,
      uid: postObj.uid,
      postId: postObj.postId
    }))
)

export const getPosts = (posts) => (
  posts
    .filter(postObj => postObj.post ? true : false )
    .map(postObj => ({
      post: postObj.post,
      uid: postObj.uid,
      postId: postObj.postId
    }))  
)

export const gerPostObj = (posts, postId) => {
  const idx = posts.findIndex(postObj => postObj.postId === postId)
  return idx >= 0 ? posts[idx] : null
}