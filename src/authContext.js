// src/authContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

let firebaseApp = null;

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [snackMessage, setSnackMessage] = useState(null);

  const initializeFirebase = () => {
    if (!firebaseApp) {
      firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    }
    const auth = getAuth(firebaseApp);
    const currentUser = auth.currentUser || null;
    setUser(currentUser);
    return firebaseApp;
  };

  useEffect(() => {
    const app = initializeFirebase();
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
        setSnackMessage("Sign in cancelled.");
      } else {
        setSnackMessage(error.message);
      }
      return null;
    }
  };

  const signOutUser = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      setSnackMessage(error.message);
    }
  };

  const clearSnack = () => setSnackMessage(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        snackMessage,
        initializeFirebase,
        signInWithGoogle,
        signOutUser,
        clearSnack,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}