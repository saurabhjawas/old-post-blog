export const getWorkObject = (workList, postId) => {

  const idx = workList.findIndex(workObj => workObj.postId === postId )

  if (idx >= 0) {
    
    return workList[idx]
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