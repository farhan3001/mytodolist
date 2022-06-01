import firebase from 'firebase';
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBInzWok5V6el8PlHTp5uT5--QOxMRjPOw",
    authDomain: "my-app-3b12e.firebaseapp.com",
    databaseURL: "https://my-app-3b12e-default-rtdb.firebaseio.com",
    projectId: "my-app-3b12e",
    storageBucket: "my-app-3b12e.appspot.com",
    messagingSenderId: "689267328559",
    appId: "1:689267328559:web:ade2960f48784165bce8da"
  };
  
  export const db = firebase.initializeApp(firebaseConfig).firestore();