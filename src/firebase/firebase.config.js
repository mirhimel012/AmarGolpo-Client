// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd1NlpxpPMyfzegHGDljkqqJFnwzIDzBM",
  authDomain: "spellbound-library.firebaseapp.com",
  projectId: "spellbound-library",
  storageBucket: "spellbound-library.appspot.com",
  messagingSenderId: "936805679495",
  appId: "1:936805679495:web:0b527509a0647daa955322"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;