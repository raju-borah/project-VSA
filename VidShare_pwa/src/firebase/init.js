import firebase from 'firebase'
// import firestore from 'firebase/firestore'
var config = {
    apiKey: "AIzaSyDZEum6Pbyp1fl3-OYeqnEs3zVyM0YFg6E",
    authDomain: "thevsapp.firebaseapp.com",
    databaseURL: "https://thevsapp.firebaseio.com",
    projectId: "thevsapp",
    storageBucket: "thevsapp.appspot.com",
    messagingSenderId: "182971808770"
};
const firebaseApp = firebase.initializeApp(config);
let functions = firebaseApp.functions()
export default firebaseApp.firestore()
export { functions }
