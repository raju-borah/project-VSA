import firebase from 'firebase'
// import firestore from 'firebase/firestore'
var config = {
// paste the config from the firebase project
};

const firebaseApp = firebase.initializeApp(config);
let functions = firebaseApp.functions()
export default firebaseApp.firestore()
export { functions }
