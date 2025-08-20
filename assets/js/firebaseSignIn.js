import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  doc,
  getFirestore,
  setDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcjzl4sdDrJudKZAUMRWfTOY19d5HqzPQ",
  authDomain: "localix-f34d7.firebaseapp.com",
  projectId: "localix-f34d7",
  storageBucket: "localix-f34d7.firebasestorage.app",
  messagingSenderId: "482394523204",
  appId: "1:482394523204:web:02d40423889f37f72d1e11",
  measurementId: "G-Q3S5LB0BEN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const lsubmit = document.getElementById("submitSignIn");
lsubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth(app);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("User signed in successfully!");
      const user = userCredential.user;
      localStorage.setItem("SignInId", user.uid);
      window.location.href = "dashboard.html";
      localStorage.setItem("projectNumber", 0);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        alert("Invalid credentials. Please check your email and password.");
      } else {
        alert("User not found, please sign up first.");
      }
    });
});
