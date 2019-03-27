import firebase from 'firebase'
// import firestore from 'firebase/firestore'
var config = {
    // config from the firebase will be added here

};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()