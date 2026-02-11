package src/pages/UserInfo.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SignOutButton from '../components/SignOutButton';

const UserInfo = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>No user logged in.</div>;
  }

  return (
    <div>
      <h2>User Info</h2>
      <ul>
        <li><strong>UID:</strong> {user.uid}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Display Name:</strong> {user.displayName}</li>
        <li>
          <strong>Photo URL:</strong>{' '}
          {user.photoURL ? (
            <img src={user.photoURL} alt="User avatar" style={{ width: '50px', height: '50px' }} />
          ) : (
            'N/A'
          )}
        </li>
      </ul>
      <SignOutButton />
    </div>
  );
};

export default UserInfo;