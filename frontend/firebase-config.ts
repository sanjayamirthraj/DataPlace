// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics} from "firebase/analytics";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { get } from "http";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDypyUli_xn8qS9b9hdb_stV7FT0EcNRY8",
  authDomain: "lum-koffz-file-storage.firebaseapp.com",
  projectId: "lum-koffz-file-storage",
  storageBucket: "lum-koffz-file-storage.appspot.com",
  messagingSenderId: "327157726868",
  appId: "1:327157726868:web:1919780bee4421f963fe81",
  measurementId: "G-2BZT4MWLYN"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
const storage: FirebaseStorage = getStorage(app);

export { app, analytics, storage };