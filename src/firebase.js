import { initializeApp } from "firebase/app";

import {
  getAuth
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCcPy5c1YoqPaoK6k9dPErK4hcDhvGwbr0",
  authDomain: "axm1-axm.firebaseapp.com",
  projectId: "axm1-axm",
  storageBucket: "axm1-axm.firebasestorage.app",
  messagingSenderId: "392340576957",
  appId: "1:392340576957:web:e2396427a000874da975d4",
  measurementId: "G-Z86033GLM2"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);