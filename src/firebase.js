import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_s9Mpj39DmY9cdZmtLjMvT2yYL7VEzOg",
  authDomain: "chat-2840c.firebaseapp.com",
  projectId: "chat-2840c",
  storageBucket: "chat-2840c.appspot.com",
  messagingSenderId: "652601164482",
  appId: "1:652601164482:web:94dc73be65fad3e24ab15b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
