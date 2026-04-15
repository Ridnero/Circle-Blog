import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace these values with your actual configuration from the Firebase Console
// Project Settings > General > Your Apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKwqcAwL1oQ3gs7pNDJnYNsDfMvR5PGVw",
  authDomain: "circle-blog-44f90.firebaseapp.com",
  projectId: "circle-blog-44f90",
  storageBucket: "circle-blog-44f90.firebasestorage.app",
  messagingSenderId: "185241665712",
  appId: "1:185241665712:web:de4fda0902f6be01f4bb75"
};

// Initialize Firebase (Singleton pattern to prevent re-initialization)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Useful if you want to add image uploads later

export default app;