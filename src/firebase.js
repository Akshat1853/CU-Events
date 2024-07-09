import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEksx6yTnF90bGKy9YGl7q2aGK9Wwo_Mc",
  authDomain: "cu-events-7e63c.firebaseapp.com",
  projectId: "cu-events-7e63c",
  storageBucket: "cu-events-7e63c.appspot.com",
  messagingSenderId: "552621620740",
  appId: "1:552621620740:web:57e792a815cce06b8bff51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
