package src/components/CustomSnackBar.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Colors = {
  black: '#000000',
  redAccent: '#f44336',
};

const Container = styled.div`
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  background-color: ${Colors.black};
  color: ${Colors.redAccent};
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
  z-index: 1000;
`;

const CustomSnackBar = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return <Container>{message}</Container>;
};

export default CustomSnackBar;