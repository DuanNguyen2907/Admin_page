// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyPDPAYtrfd2TlAygocuDkENXMjgfLRwY",
    authDomain: "android-app-df284.firebaseapp.com",
    databaseURL: "https://android-app-df284-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "android-app-df284",
    storageBucket: "android-app-df284.appspot.com",
    messagingSenderId: "623028009490",
    appId: "1:623028009490:web:9acc579fd14ea5f10b76cb",
    measurementId: "G-TLH1NE9ZVE"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
