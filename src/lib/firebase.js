
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add your own Firebase configuration from the Firebase console
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  "projectId": "freshoz-fresh-fast",
  "appId": "1:18872354603:web:9351162d83be472ac6e76e",
  "storageBucket": "freshoz-fresh-fast.appspot.com",
  "apiKey": "AIzaSyC5r4rbKvuPEYTaUDkaTyDyBgjYVxZwmdY",
  "authDomain": "freshoz-fresh-fast.firebaseapp.com",
  "messagingSenderId": "18872354603",
  "databaseURL": "https://freshoz-fresh-fast.firebaseio.com",
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApps()[0];
}

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebaseApp);

export { firebaseApp, database };
