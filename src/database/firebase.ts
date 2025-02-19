// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDXA_LEbIxfY408oo6IV2SyFp9rW6Dd2N4",
  authDomain: "hospital-29356.firebaseapp.com",
  projectId: "hospital-29356",
  storageBucket: "hospital-29356.firebasestorage.app",
  messagingSenderId: "736555440090",
  appId: "1:736555440090:web:fcf5478c3d8588b6ed12e3",
  measurementId: "G-50MLWZBV1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};