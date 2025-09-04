//Authentication (Firebase)
//Import the app initializer
console.log("JS loaded")
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
  getAuth, createUserWithEmailAndPassword,
 } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
const firebaseConfig = {
  apiKey: "AIzaSyCLkHnlw9-cX6ec-6sEN7akSJe9ysBGoP0",
  authDomain: "first-proj-firebase9.firebaseapp.com",
  projectId: "first-proj-firebase9",
  storageBucket: "first-proj-firebase9.firebasestorage.app",
  messagingSenderId: "849709724050",
  appId: "1:849709724050:web:ef367fc48a585d0224914b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()

//Login 
const signupForm = document.querySelector(".signUp")
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = signupForm.email.value
    const password = signupForm.password.value
    createUserWithEmailAndPassword(auth, email, password)
    .then(()=>{
        alert("Sign up successful!")
        signupForm.reset()
        window.location.href = "index.html"
    })
    .catch((err)=>{
        alert(err.message)
        signupForm.reset()
    })
})
