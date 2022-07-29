import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyASLWIf6KkD061wxEs741WFinQAtvofiLw",
  authDomain: "rtracker-b58a3.firebaseapp.com",
  projectId: "rtracker-b58a3",
  storageBucket: "rtracker-b58a3.appspot.com",
  messagingSenderId: "789053160713",
  appId: "1:789053160713:web:b48554dabe315ca77d27d8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)