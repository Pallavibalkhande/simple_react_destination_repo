package src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import CustomSnackBar from '../components/CustomSnackBar';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [snackMessage, setSnackMessage] = useState(null);

  const initializeFirebase = async () => {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getAuth } = await import('firebase/auth');
    let app;
    if (!getApps().length) {
      app = initializeApp({
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
      });
    } else {
      app = getApps()[0];
    }
    const auth = getAuth(app);
    if (auth.currentUser) {
      setUser(auth.currentUser);
    }
    return app;
  };

  const signInWithGoogle = async () => {
    try {
      const { getAuth, GoogleAuthProvider, signInWithPopup, signInWithCredential } = await import('firebase/auth');
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (!result) return;
      const credential = GoogleAuthProvider.credential(
        result._tokenResponse?.oauthAccessToken,
        result._tokenResponse?.idToken
      );
      const userCredential = await signInWithCredential(auth, credential);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (error) {
      let message = 'Error occurred using Google Sign‑In. Try again.';
      if (error?.code === 'auth/account-exists-with-different-credential') {
        message = 'The account already exists with a different credential.';
      } else if (error?.code === 'auth/invalid-credential') {
        message = 'Error occurred while accessing credentials. Try again.';
      }
      setSnackMessage(message);
    }
  };

  const signOut = async () => {
    try {
      const { getAuth, signOut: firebaseSignOut } = await import('firebase/auth');
      const auth = getAuth();
      const isWeb = typeof window !== 'undefined';
      if (!isWeb) {
        try {
          const { GoogleSignin } = await import('@react-native-google-signin/google-signin');
          await GoogleSignin.signOut();
        } catch (_) {
          // Non‑web Google sign‑out not available; ignore
        }
      }
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      setSnackMessage('Error signing out. Try again.');
    }
  };

  useEffect(() => {
    initializeFirebase();
  }, []);

  const contextValue = {
    user,
    setUser,
    snackMessage,
    setSnackMessage,
    initializeFirebase,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      {snackMessage && (
        <CustomSnackBar
          message={snackMessage}
          onClose={() => setSnackMessage(null)}
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);