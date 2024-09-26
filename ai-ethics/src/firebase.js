import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

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
const storage = getStorage(app);
const imagesRef = ref(storage, "images");

/*********************************************************
 * handle authentication through this class
 *
 * usage:
 * import authManager from './path-to-authManager';
 * authManager.registerWithEmailAndPassword(name, email, password);
 * authManager.sendPasswordReset(email);
 * authManager.logout();
 * authManager.loginWithGoogle();
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

  async loginWithGoogle() {
    try {
      const res = await signInWithPopup(auth, googsProvider);

      // Get Google credential and user info
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      const user = res.user;

      // Check if user already exists in Firestore
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const existingUsers = await getDocs(q);

      if (existingUsers.empty) {
        // User is not registered, add them to the database
        const userDoc = await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          token: token,
        });
        console.log("New user registered:", userDoc.id);
      } else {
        // User already exists, just log them in
        console.log("User already exists, logging in:", user.uid);
      }
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

export { auth, db, authManager, imagesRef };
