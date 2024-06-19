const admin = require('firebase-admin');

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

  
admin.initializeApp(firebaseConfig);

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };