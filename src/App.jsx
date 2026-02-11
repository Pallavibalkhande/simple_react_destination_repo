import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './theme.css';
import ThemeProvider from './ThemeContext';
import Counter from './Counter';
import SignInScreen from './SignInScreen';
import HomePage from './HomePage';
import Snackbar from './Snackbar';
import { initializeFirebase } from './AuthService';

/**
 * App – Root UI container.
 * Corresponds to the Flutter RootApp and can later host a router without modification.
 * Provides ThemeProvider, AuthProvider, SnackbarProvider, and BrowserRouter.
 * Renders a stable root element with id="app-root" containing the Counter component.
 */

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = initializeFirebase((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const SnackbarContext = createContext(null);
export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState('');

  const showMessage = (msg) => setMessage(msg);
  const clearMessage = () => setMessage('');

  return (
    <SnackbarContext.Provider value={{ message, showMessage, clearMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const AuthRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={user ? '/home' : '/login'} replace />;
};

const AppContent = () => {
  const { message, clearMessage } = useSnackbar();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignInScreen />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<AuthRedirect />} />
      </Routes>
      <div id="app-root">
        <Counter />
      </div>
      <Snackbar message={message} onClose={clearMessage} />
    </BrowserRouter>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <SnackbarProvider>
        <AppContent />
      </SnackbarProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App