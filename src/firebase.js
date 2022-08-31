import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDnsCXlNJvDIWbO1YywSFSRFp-G1P0rUoA",
    authDomain: "chess-app-12345.firebaseapp.com",
    projectId: "chess-app-12345",
    storageBucket: "chess-app-12345.appspot.com",
    messagingSenderId: "64419273885",
    appId: "1:64419273885:web:b2321fbdc84b94daccc874",
    measurementId: "G-JCM89STS6E"
  };
  
// Initialize Firebase

// eslint-disable-next-line
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()
export default firebase