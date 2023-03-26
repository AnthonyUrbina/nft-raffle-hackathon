// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa3a2M39BQqwziPbqwla38rHlOLGU3e-Y",
  authDomain: "raffle-d777a.firebaseapp.com",
  projectId: "raffle-d777a",
  storageBucket: "raffle-d777a.appspot.com",
  messagingSenderId: "183967005356",
  appId: "1:183967005356:web:3df1f266e8c67b67003d09",
  measurementId: "G-V66VPGE0EW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db};