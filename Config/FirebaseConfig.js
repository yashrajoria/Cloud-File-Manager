// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloud-file-manager-394211.firebaseapp.com",
  projectId: "cloud-file-manager-394211",
  storageBucket: "cloud-file-manager-394211.appspot.com",
  messagingSenderId: "1053019572615",
  appId: "1:1053019572615:web:e48701542fd25eb785eb22",
  measurementId: "G-K3GKM7FTTN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
