import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SignInButton = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleClick = async () => {
    if (signInWithGoogle) {
      await signInWithGoogle();
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      Sign in with Google
    </button>
  );
};

export default SignInButton;