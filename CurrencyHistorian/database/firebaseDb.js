// database/firebaseDb.js

//import * as firebase from "firebase";
import firebase from 'firebase/app' 
import firestore from "firebase/firestore";


const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "reactnativefirebase-00000.firebaseapp.com",
  databaseURL: "https://reactnativefirebase-00000.firebaseio.com",
  projectId: "reactnativefirebase-00000",
  storageBucket: "reactnativefirebase-00000.appspot.com",
  messagingSenderId: "000000000000000",
  appId: "1:000000000000000:web:000000000000000"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
