import firebase from 'firebase';
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyDQjQuDrjouf03TBjhnsc-_ayskc9fhQIo",
    authDomain: "booksanta-e7b4d.firebaseapp.com",
    projectId: "booksanta-e7b4d",
    storageBucket: "booksanta-e7b4d.appspot.com",
    messagingSenderId: "1077918282775",
    appId: "1:1077918282775:web:32e83ce155f6f36c2a5852"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase.firestore();