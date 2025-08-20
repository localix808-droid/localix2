// Import the functions you need from the SDKs you need
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

const rsubmit = document.getElementById("submitSignUp");
rsubmit.addEventListener("click", (event) => {
  event.preventDefault();
  const name = document.getElementById("rfullName").value;
  const email = document.getElementById("remail").value;
  const phone = document.getElementById("rphone").value;
  const password = document.getElementById("rpassword").value;
  const confirmPassword = document.getElementById("rconfirmPassword").value;
  const auth = getAuth(app);
  const db = getFirestore(app);

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          name: name,
          email: email,
          phone: phone,
          password: password,
          plan: "Free",
          UID: user.uid,
          points: Number,
        };
        alert("User created successfully!");
        const docRef = doc(db, "Users", user.uid);
        setDoc(docRef, userData)
          .then(() => {
            window.location.href = "login.html";
          })
          .catch((error) => {
            alert("error: ", error);
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already in use. Please try another email.");
        } else {
          alert("Unable to create user: " + error.message);
        }
      });
  }
});
