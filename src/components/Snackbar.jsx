import React, { useEffect } from 'react';

const Snackbar = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const containerStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#000',
    color: '#ff0000',
    padding: '12px 24px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    letterSpacing: '0.5px',
    zIndex: 1000,
  };

  const buttonStyle = {
    background: 'transparent',
    border: 'none',
    color: '#ff0000',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <span>{message}</span>
      <button onClick={onClose} style={buttonStyle}>✕</button>
    </div>
  );
};

export default Snackbar;