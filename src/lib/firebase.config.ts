// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  "projectId": "freshoz-fresh-fast",
  "appId": "1:18872354603:web:9351162d83be472ac6e76e",
  "storageBucket": "freshoz-fresh-fast.appspot.com",
  "apiKey": "AIzaSyC5r4rbKvuPEYTaUDkaTyDyBgjYVxZwmdY",
  "authDomain": "freshoz-fresh-fast.firebaseapp.com",
  "messagingSenderId": "18872354603",
  "databaseURL": "https://freshoz-fresh-fast-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// Initialize Firebase services
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, database, auth, db, storage };