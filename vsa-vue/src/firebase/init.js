import firebase from 'firebase'
// import firestore from 'firebase/firestore'
var config = {
  // firebase config goes here
  };
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()