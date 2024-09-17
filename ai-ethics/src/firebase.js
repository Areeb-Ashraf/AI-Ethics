// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// I am pulling these imports from my last project that used firebase
// I will clean it up as I go
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBN4IuBr5w1Qyar6H4qHZjeaEEqaJr_Lo4",
  authDomain: "ai-ethics-4901.firebaseapp.com",
  projectId: "ai-ethics-4901",
  storageBucket: "ai-ethics-4901.appspot.com",
  messagingSenderId: "953629317280",
  appId: "1:953629317280:web:d91f986f9a2f99c617d1c5",
  measurementId: "G-MN0KF05TSE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/*********************************************************
 * handle authentication through this class
 * usage:
 *
 * import authManager from './path-to-authManager';
 * authManager.registerWithEmailAndPassword(name, email, password);
 * authManager.sendPasswordReset(email);
 * authManager.logout();
 ***********************************************************/

class AuthManager {
  async registerWithEmailAndPassword(name, email, password) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  logout() {
    signOut(auth);
  }
}

const authManager = new AuthManager();

export { auth, db, authManager };
