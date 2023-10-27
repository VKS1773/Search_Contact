// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSnd1QHcLkKm3RgkY7ByUaCSuhsNZxtlY",
  authDomain: "searchcontact-58054.firebaseapp.com",
  projectId: "searchcontact-58054",
  storageBucket: "searchcontact-58054.appspot.com",
  messagingSenderId: "28369262017",
  appId: "1:28369262017:web:f822fd50e96eb184900b40"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)