package src/ThemeContext.js
import React, { createContext } from 'react';
import * as constants from './constants';

/**
 * React context that provides theme-related constants throughout the application.
 */
export const ThemeContext = createContext({});

/**
 * Provider component that supplies the imported constants as a single value object to ThemeContext.
 *
 * @param {{ children: React.ReactNode }} props - Component props.
 * @returns {JSX.Element} The context provider wrapping its children.
 */
export const ThemeProvider = ({ children }) => {
  const value = { ...constants };
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};