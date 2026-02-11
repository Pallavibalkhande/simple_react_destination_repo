// package src/components
import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomSnackBar from './CustomSnackBar';

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showSnackBar = useCallback((msg) => {
    setMessage(msg);
  }, []);

  const handleClose = () => {
    setMessage(null);
  };

  return (
    <SnackbarContext.Provider value={showSnackBar}>
      {children}
      {message && <CustomSnackBar message={message} onClose={handleClose} />}
    </SnackbarContext.Provider>
  );
};

export const useSnackBar = () => {
  const context = useContext(SnackbarContext);
  if (context === null) {
    throw new Error('useSnackBar must be used within a SnackbarProvider');
  }
  return context;
};