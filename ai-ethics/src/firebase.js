// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// the firebase creds as pulled from .env file
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const googsProvider = new GoogleAuthProvider();

/*********************************************************
 * handle authentication through this class
 *
 * usage:
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

  async logInWithEmailAndPassword(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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

  // google oauth login and register
  async loginWithGoogle() {
    try {
      const res = await signInWithPopup(auth, googsProvider);

      // This gives you a Google Access Token and the signed-in user's info
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;

      const user = res.user;
      const userDoc = await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        token: token,
      });
      console.log(userDoc);
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
