package src/components/Counter.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';

test('Counter increments smoke test', () => {
  render(<Counter />);
  const counter = screen.getByTestId('counter-value');
  expect(counter).toHaveTextContent('0');
  const button = screen.getByTestId('increment-button');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  const updatedCounter = screen.getByTestId('counter-value');
  expect(updatedCounter).toHaveTextContent('1');
  expect(screen.queryByText('0')).not.toBeInTheDocument();
});