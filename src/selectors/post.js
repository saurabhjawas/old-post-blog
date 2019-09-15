export const getPostObject = (posts, postId) => {

  const idx = posts.findIndex(postObj => {      
    return postObj.postId === postId
  })

  if (idx >= 0) {
    return posts[idx]
  } else {
    return null
  }
}
