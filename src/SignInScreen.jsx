package src/SignInScreen.jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const SignInScreen = () => {
  const { APP_TITLE, PRIMARY_COLOR, SECONDARY_COLOR } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: 'var(--scaffold-background)', padding: '20px' }}>
      <h1>{APP_TITLE || 'Sign In'}</h1>
      <button
        style={{
          backgroundColor: PRIMARY_COLOR,
          color: SECONDARY_COLOR,
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Placeholder Button
      </button>
      {/* Authentication logic will be added later */}
    </div>
  );
};

export default SignInScreen;