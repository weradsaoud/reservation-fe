// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC5EgQ8wssxI2-RBFcgkDa3Y6XY-yn0TPI",
    authDomain: "reservationapp-150e9.firebaseapp.com",
    projectId: "reservationapp-150e9",
    storageBucket: "reservationapp-150e9.appspot.com",
    messagingSenderId: "489192280845",
    appId: "1:489192280845:web:41a39da278446b378e1644",
    measurementId: "G-69VZPDFC5J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

