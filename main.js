import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD39Tll1Sqbagwkc0Rzu_kfo0d93ecSKds",
  authDomain: "jungle-315.firebaseapp.com",
  projectId: "jungle-315",
  storageBucket: "jungle-315.firebasestorage.app",
  messagingSenderId: "27741378378",
  appId: "1:27741378378:web:570c9ecfb7130b3a1453b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let canSeeInformation = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in:", user.email);
    canSeeInformation = true;
  } else {
    console.log("No user is signed in.");
    canSeeInformation = false;
  }
});

document.getElementById("login-btn").onclick = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User logged in successfully");
    })
    .catch((error) => {
      console.error("Error logging in:", error);
    });
};

document.getElementById("signup-btn").onclick = () => {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let fName = document.getElementById("fName").value;
  let lName = document.getElementById("lName").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;

      // 2. Update the user's profile with the display name
      updateProfile(user, {
        displayName: `${fName} ${lName}`,
      })
        .then(() => {
          // Profile updated!
          console.log("User display name updated successfully!");
        })
        .catch((error) => {
          // An error occurred while updating the profile
          console.error("Error updating profile: ", error);
        });
    })
    .catch((error) => {
      console.error("Error signing up:", error);
    });
};


document.getElementById("signOut").onclick = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

<div id="app">
      <div class="form">
        <label for="fName">First Name</label>
        <input type="text" id="fName" />
        <label for="lName">Last Name</label>
        <input type="text" id="lName" />
        <label for="email">Username</label>
        <input type="text" id="email" />
        <label for="password">Password</label>
        <input type="password" id="password" />
        <button id="login-btn">Login</button>
        <button id="signup-btn">Sign Up</button>
      </div>
      <div class="message">
        <button id="googleSignIn">Sign In with Google</button>
        <button id="signOut">Sign Out</button>
      </div>
    </div>