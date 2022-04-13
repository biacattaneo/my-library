// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPNRouF4HFZmoRHl_2yDdP-rudrmfP8PI",
    authDomain: "my-library-d03bd.firebaseapp.com",
    projectId: "my-library-d03bd",
    storageBucket: "my-library-d03bd.appspot.com",
    messagingSenderId: "821335488321",
    appId: "1:821335488321:web:387c6ec74c23a59b5cd3c0",
    measurementId: "G-JQETED0G7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;