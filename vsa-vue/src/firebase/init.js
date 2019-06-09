import firebase from 'firebase'

var config = {
  // add firebase project config here
};
const firebaseApp = firebase.initializeApp(config);
let functions = firebaseApp.functions()
export default firebaseApp.firestore()
export { functions }
