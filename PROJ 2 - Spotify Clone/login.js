//Authentication (Firebase)
//Import the app initializer
console.log("JS loaded")
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
  getAuth, signInWithEmailAndPassword,
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
const loginForm = document.querySelector(".login")
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth, email, password)
    .then(()=>{
        alert("Logged in!")
        window.location.href = "index.html"
    })
    .catch((err)=>{
        alert(err.message)
        loginForm.reset()
    })
})
