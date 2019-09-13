import { database } from '../firebase/firebase'

export const USERS = 'users'
export const POSTS = 'posts'
export const UID = 'uid'

export const saveDataAsync = (dataObject, collectionName, collectionId) => {    
  if (collectionId) {
    return (
      database.ref(`${collectionName}/${collectionId}`)
        .update({ ...dataObject })
    )
  } else {
    return (
      database.ref(collectionName)
        .push({ ...dataObject })
    )
  } 
}