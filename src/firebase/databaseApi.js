import { database } from '../firebase/firebase'

export const USERS = 'users'
export const POSTS = 'posts'
export const UID = 'uid'

export const saveDataAsync = (dataObject, collectionName, collectionId) => {    
  if (collectionId) {
    return (
      database.ref(`${collectionName}/${collectionId}`)
        .update({ ...dataObject })
        .then(() => (
          new Promise((resolve) => {
            resolve({key: collectionId})
          })
        ))
    )
  } else {
    return (
      database.ref(collectionName)
        .push({ ...dataObject })
    )
  } 
}


export const fetchDataSnapshotAsync = (collectionName, itemCount , uid) => {

  if (uid) {
    return new Promise((resolve, reject) => {
      database.ref(collectionName)
        .orderByChild(UID)
        .equalTo(uid)
        .limitToLast(itemCount ? itemCount : 20)
        .once('value', resolve, reject)
    })
  } else {
    return new Promise((resolve, reject) => {
      database.ref(collectionName)
        .orderByKey()
        .limitToLast(itemCount ? itemCount : 20)
        .once('value', resolve, reject)
    })
  }

}