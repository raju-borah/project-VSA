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

// var config = {
//   apiKey: "AIzaSyB96ECFD_NS7p2cFF9WoSFF8ZbR6QbdnV8",
//   authDomain: "vsharenplay.firebaseapp.com",
//   databaseURL: "https://vsharenplay.firebaseio.com",
//   projectId: "vsharenplay",
//   storageBucket: "vsharenplay.appspot.com",
//   messagingSenderId: "974893679915",
//   appId: "1:974893679915:web:eea38ac6c61b3977"
// };
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()