// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* const firebaseConfig = {
  apiKey: "AIzaSyATSqyNMh0S2pVnUXiFTTVeRN-DDlRnaBQ",
  authDomain: "sambeckman-admin.firebaseapp.com",
  projectId: "sambeckman-admin",
  storageBucket: "sambeckman-admin.appspot.com",
  messagingSenderId: "1038294534552",
  appId: "1:1038294534552:web:c59157134e4b50050c43ed",
  measurementId: "G-M73DQ1Q56Y",
}; */
const firebaseConfig = {
  apiKey: "AIzaSyAxlg1uAQyPSeyWomLbyxn4cTHJ_DTS87E",
  authDomain: "sam-beckman.firebaseapp.com",
  projectId: "sam-beckman",
  storageBucket: "sam-beckman.appspot.com",
  messagingSenderId: "27526874067",
  appId: "1:27526874067:web:78a1acfd0fb94e3b68a526",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
