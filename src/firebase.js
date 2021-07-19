// Firebase App (the core Firebase SDK) is always required and must be listed first

// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
    apiKey: "AIzaSyCh1ETAkABwTYLkJzWOHr_y0NJNf9pBpCo",
    authDomain: "doctor-patient-57f86.firebaseapp.com",
    projectId: "doctor-patient-57f86",
    storageBucket: "doctor-patient-57f86.appspot.com",
    messagingSenderId: "795389127430",
    appId: "1:795389127430:web:45cdb87656efa2ae8b0c87",
    measurementId: "G-ZY8E52DDJH"
  };
  // Initialize Firebase

  export default firebaseConfig

// export  function googleProvider(){
//     const provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
//     provider.setCustomParameters({
//         'login_hint': 'user@example.com'
//       });
//   }


  