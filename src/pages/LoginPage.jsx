package src/pages
import React, { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const GoogleSignInButton = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = useCallback(async () => {
    const user = await signInWithGoogle();
    if (user) {
      navigate('/home', { replace: true });
    }
  }, [signInWithGoogle, navigate]);

  return (
    <div>
      <button aria-label="Sign in with Google" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleSignInButton