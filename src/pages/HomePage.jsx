package src/pages/HomePage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { currentUser, signOut, clearUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      clearUser();
      navigate('/login', { replace: true });
    } catch (e) {
      // error handling can be added here
    }
  };

  const displayName = currentUser.displayName || currentUser.email;

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      {currentUser.photoURL && (
        <img
          src={currentUser.photoURL}
          alt="User avatar"
          style={{ width: '100px', height: '100px', borderRadius: '50%' }}
        />
      )}
      <h1>Welcome, {displayName}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default HomePage;