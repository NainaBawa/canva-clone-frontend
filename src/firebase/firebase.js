// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2z-RxDQjhvMEV8Fw3RhA55RN0-76z3_8",
  authDomain: "canva-clone-8b8ec.firebaseapp.com",
  projectId: "canva-clone-8b8ec",
  storageBucket: "canva-clone-8b8ec.appspot.com",
  messagingSenderId: "652191582397",
  appId: "1:652191582397:web:6fd11af40edebeb57ecfd4",
  measurementId: "G-B6LMNZ8JGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

export { db };