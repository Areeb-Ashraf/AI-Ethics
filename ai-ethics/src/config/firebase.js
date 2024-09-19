import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBN4IuBr5w1Qyar6H4qHZjeaEEqaJr_Lo4',
  authDomain: 'ai-ethics-4901.firebaseapp.com',
  projectId: 'ai-ethics-4901',
  storageBucket: 'ai-ethics-4901.appspot.com',
  messagingSenderId: '953629317280',
  appId: '1:953629317280:web:d91f986f9a2f99c617d1c5',
  measurementId: 'G-MN0KF05TSE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

class AuthManager {
  async registerWithEmailAndPassword(name, email, password) {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        email,
        authProvider: 'local',
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  async loginWithEmailAndPassword(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  }

  async sendPasswordReset(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset link sent!');
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
