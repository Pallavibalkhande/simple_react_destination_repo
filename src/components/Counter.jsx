// package src/components
import React, { useState } from 'react';

const INITIAL_VALUE = 0;

const Counter = () => {
  const [count, setCount] = useState(INITIAL_VALUE);
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };
  return (
    <div>
      <span data-testid="counter-value">{String(count)}</span>
      <button aria-label="increment" data-testid="increment-button" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
};

export default Counter;