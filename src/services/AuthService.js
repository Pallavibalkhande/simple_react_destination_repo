package src.services
import { firebaseApp, auth } from '../firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import router from '../router';
import { setUser } from '../context/AuthContext';
import { showSnackBar } from '../utils/snackbar';

const AuthService = {
  async initializeFirebase() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.replace('/home');
      } else {
        setUser(null);
      }
    });
    return firebaseApp;
  },

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    } catch (error) {
      if (error && error.code) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            showSnackBar('Google sign‑in popup closed by user.');
            break;
          case 'auth/popup-blocked':
            showSnackBar('Google sign‑in popup was blocked.');
            break;
          case 'auth/cancelled-popup-request':
            showSnackBar('Google sign‑in request was cancelled.');
            break;
          default:
            showSnackBar(`Google sign‑in error: ${error.message}`);
        }
      } else {
        showSnackBar('An unexpected error occurred during Google sign‑in.');
      }
    }
  },

  async signOut() {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      showSnackBar('Error signing out. Please try again.');
    }
  }
};

export default AuthService;