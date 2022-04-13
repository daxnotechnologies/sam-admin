// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATSqyNMh0S2pVnUXiFTTVeRN-DDlRnaBQ",
  authDomain: "sambeckman-admin.firebaseapp.com",
  projectId: "sambeckman-admin",
  storageBucket: "sambeckman-admin.appspot.com",
  messagingSenderId: "1038294534552",
  appId: "1:1038294534552:web:c59157134e4b50050c43ed",
  measurementId: "G-M73DQ1Q56Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
