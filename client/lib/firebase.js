import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "guild-revame-3d635.firebaseapp.com",
  projectId: "guild-revame-3d635",
  storageBucket: "guild-revame-3d635.appspot.com",
  messagingSenderId: "553588461379",
  appId: "1:553588461379:web:3fc380d2977486592629f6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

