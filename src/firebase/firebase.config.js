// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDez4haCmSg8G0qqDYUFpHXbH7PHdKvAC0",
  authDomain: "amargolpofire.firebaseapp.com",
  projectId: "amargolpofire",
  storageBucket: "amargolpofire.firebasestorage.app",
  messagingSenderId: "343354545205",
  appId: "1:343354545205:web:fb0f16354e4282e60f8d7c",
  measurementId: "G-QPWHLCPPRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;