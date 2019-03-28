import firebase from 'firebase/app' // NOT import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyD5i6GMDNAi0tgYGj6Ec3U2GVXHaLSx_78',
  authDomain: 'deploy-7003e.firebaseapp.com',
  databaseURL: 'https://deploy-7003e.firebaseio.com',
  projectId: 'deploy-7003e',
  storageBucket: 'deploy-7003e.appspot.com',
  messagingSenderId: '1048716810899'
})

// firebase utils
const db = firebaseApp.firestore()

// date issue fix according to firebase
// const settings = {
//   timestampsInSnapshots: true
// }
// db.settings(settings)

// firebase collections
const scheduleCollection = db.collection('schedule')
const schedule2Collection = db.collection('schedule2')

export {
  db,
  scheduleCollection,
  schedule2Collection
}
