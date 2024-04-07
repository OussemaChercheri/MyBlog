// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-da452.firebaseapp.com",
    projectId: "mern-blog-da452",
    storageBucket: "mern-blog-da452.appspot.com",
    messagingSenderId: "674243195584",
    appId: "1:674243195584:web:c88b965c350b5c73f37325"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
