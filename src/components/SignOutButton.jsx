package src/components/SignOutButton.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SignOutButton = () => {
  const { signOutUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <button type="button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;