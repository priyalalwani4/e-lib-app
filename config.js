import firebase from 'firebase';
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyCvhB3ufUeG9ngdn7YoCw_egB5PR99M5kA",
    authDomain: "e-library-2da54.firebaseapp.com",
    projectId: "e-library-2da54",
    storageBucket: "e-library-2da54.appspot.com",
    messagingSenderId: "450101133427",
    appId: "1:450101133427:web:55b3adad798bac18332a06"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();