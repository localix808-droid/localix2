import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import {
  addDoc,
  collection,
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
const db = getFirestore(app);
const userId = localStorage.getItem("SignInId");

let projectNumber = Number(localStorage.getItem("projectNumber"));

const projectSubmit = document.getElementById("submitProject");

projectSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  alert("Processing project submission...");
  const projectName = document.getElementById("businessName").value;
  const businessType = document.getElementById("businessType").value;
  const yearsInBusiness = document.getElementById("yearsInBusiness").value;
  const employeeCount = document.getElementById("employeeCount").value;
  const monthlyRevenue = document.getElementById("monthlyRevenue").value;
  const ownerName = document.getElementById("ownerName").value;
  const businessPhone = document.getElementById("businessPhone").value;
  const businessEmail = document.getElementById("businessEmail").value;
  const existingWebsite = document.getElementById("existingWebsite").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zip").value;
  const businessInsights = document.getElementById("businessInsights").checked;
  const socialMedia = document.getElementById("socialMedia").checked;
  const consulting = document.getElementById("consulting").checked;
  const website = document.getElementById("website").checked;
  const app = document.getElementById("app").checked;
  const marketing = document.getElementById("marketing").checked;
  const inventory = document.getElementById("inventory").checked;
  const booking = document.getElementById("booking").checked;
  const primaryGoal = document.getElementById("primaryGoal").value;
  const description = document.getElementById("description").value;
  const budget = document.getElementById("budget").value;
  const timeline = document.getElementById("timeline").value;

  const projectData = {
    projectName: projectName,
    businessType: businessType,
    yearsInBusiness: yearsInBusiness,
    employeeCount: employeeCount,
    monthlyRevenue: monthlyRevenue,
    ownerName: ownerName,
    businessPhone: businessPhone,
    businessEmail: businessEmail,
    existingWebsite: existingWebsite,
    address: address,
    city: city,
    state: state,
    zip: zip,
    businessInsights: businessInsights,
    socialMedia: socialMedia,
    consulting: consulting,
    website: website,
    app: app,
    marketing: marketing,
    inventory: inventory,
    booking: booking,
    primaryGoal: primaryGoal,
    description: description,
    budget: budget,
    timeline: timeline,
  };
  const formattedProjectData = Object.entries({
    projectName,
    businessType,
    yearsInBusiness,
    employeeCount,
    monthlyRevenue,
    ownerName,
    businessPhone,
    businessEmail,
    existingWebsite,
    address,
    city,
    state,
    zip,
    businessInsights,
    socialMedia,
    consulting,
    website,
    app,
    marketing,
    inventory,
    booking,
    primaryGoal,
    description,
    budget,
    timeline,
  })
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  alert("Project data:\n" + formattedProjectData);

  const docRef = doc(db, "Users", userId);
  const subCollection = collection(docRef, "Projects");
  addDoc(subCollection, projectData)
    .then(() => {
      alert("Project added successfully!");
      projectNumber += 1;
      localStorage.setItem("projectNumber", projectNumber);
    })
    .catch((error) => {
      alert("Error adding Project: ", error);
    });
});
